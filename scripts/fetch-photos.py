"""
Fetch photography from Unsplash for the city heroes and the service portfolios.

Deliberately frugal with the API: one search per target, twelve results taken
from that single response, and every response cached to disk so a re-run costs
nothing. A demo key allows 50 requests an hour and there are 45 targets, so a
careless retry loop would lock us out for an hour.

Image downloads come from images.unsplash.com and do not count against the
search rate limit.

    UNSPLASH_KEY=xxx python3 scripts/fetch-photos.py cities
    UNSPLASH_KEY=xxx python3 scripts/fetch-photos.py services
"""
import json, os, ssl, sys, time, urllib.parse, urllib.request
from pathlib import Path

KEY = os.environ.get("UNSPLASH_KEY")
if not KEY:
    sys.exit("Set UNSPLASH_KEY")

CTX = ssl._create_unverified_context()
CACHE = Path(".cache/unsplash")
CACHE.mkdir(parents=True, exist_ok=True)
CREDITS = Path("public/images/credits.json")


def search(slug: str, query: str, per_page: int = 12) -> dict:
    """One search, cached forever. Never spends a request twice on a slug."""
    cached = CACHE / f"{slug}.json"
    if cached.exists():
        return json.loads(cached.read_text())
    url = "https://api.unsplash.com/search/photos?" + urllib.parse.urlencode(
        {"query": query, "per_page": per_page, "orientation": "landscape", "content_filter": "high"}
    )
    req = urllib.request.Request(
        url, headers={"Authorization": f"Client-ID {KEY}", "Accept-Version": "v1"}
    )
    with urllib.request.urlopen(req, context=CTX) as r:
        remaining = r.headers.get("X-Ratelimit-Remaining")
        data = json.load(r)
    cached.write_text(json.dumps(data))
    print(f"    searched (rate limit left: {remaining})")
    time.sleep(0.4)
    return data


def download(url: str, dest: Path, width: int) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    full = f"{url}&w={width}&q=80&fm=jpg&fit=max"
    req = urllib.request.Request(full, headers={"User-Agent": "ylala/1.0"})
    with urllib.request.urlopen(req, context=CTX) as r:
        dest.write_bytes(r.read())


def credit(photo: dict) -> dict:
    u = photo["user"]
    return {
        "id": photo["id"],
        "description": photo.get("alt_description") or "",
        "photographer": u["name"],
        "photographer_url": u["links"]["html"],
        "source": photo["links"]["html"],
    }


def load_credits() -> dict:
    """The Unsplash half of the merged credits file."""
    if not CREDITS.exists():
        return {}
    return json.loads(CREDITS.read_text()).get("unsplash", {})


def save_credits(d: dict) -> None:
    """Write back only the unsplash section, leaving commissioned work alone."""
    doc = json.loads(CREDITS.read_text()) if CREDITS.exists() else {}
    doc["unsplash"] = d
    CREDITS.write_text(json.dumps(doc, indent=2, ensure_ascii=False) + "\n")


# The twelve destination cities that still show a regional stand-in. Queries
# name the specific place, because "Provence" returns lavender fields for
# everything and we want Aix.
CITY_QUERIES = {
    "aix-en-provence": "Aix-en-Provence old town fountain plane trees",
    "avignon": "Avignon Palais des Papes bridge",
    "cannes": "Cannes Le Suquet old town harbour",
    "saint-tropez": "Saint-Tropez old port pastel facades",
    "annecy": "Annecy old town canals lake",
    "chamonix": "Chamonix Mont Blanc valley village",
    "colmar": "Colmar Alsace half-timbered canal",
    "mont-saint-michel": "Mont Saint Michel abbey bay",
    "etretat": "Etretat cliffs Normandy arch",
    "biarritz": "Biarritz beach rocher de la vierge",
    "carcassonne": "Carcassonne medieval citadel ramparts",
    "reims": "Reims cathedral champagne",
}

# What each service's portfolio should show: people being photographed, in the
# register the service actually sells.
SERVICE_QUERIES = {
    "portrait": "studio portrait professional headshot neutral background",
    "lifestyle-portrait": "lifestyle portrait woman outdoors natural light",
    "couple": "couple photoshoot walking city street candid",
    "proposal": "marriage proposal engagement ring moment",
    "engagement": "engagement couple portrait outdoors",
    "family": "family portrait outdoors children parents",
    "newborn": "newborn baby home natural light photography",
    "maternity": "maternity pregnancy portrait outdoors",
    "christening": "christening baptism ceremony church family",
    # Naming France matters here: a bare "wedding" query returns a wall of
    # Indian weddings. The live gallery is hand-picked across several
    # France-specific searches, so a bulk re-run will overwrite it.
    "wedding": "wedding chateau France bride groom",
    "elopement": "elopement small wedding couple mountains",
    "vacation": "travel couple holiday photoshoot europe",
    "city-tour": "walking tour photographer city europe",
    "headshots": "corporate headshot business portrait office",
    "personal-brand": "personal branding photoshoot entrepreneur working",
    "corporate-event": "corporate event conference photography audience",
    "event": "event photography guests celebration",
    "product": "product photography packshot studio",
    "food": "restaurant food photography plated dish",
    "real-estate": "real estate interior photography bright living room",
    "hotel-airbnb": "hotel room interior photography boutique",
    "fashion-editorial": "fashion editorial photoshoot model outdoors",
    "model-portfolio": "model portfolio studio fashion test shoot",
    "paris-photoshoot": "Paris photoshoot couple street eiffel",
    "eiffel-tower-session": "Eiffel Tower couple photoshoot Paris",
    "provence-destination-wedding": "Provence wedding lavender chateau couple",
    "loire-chateau-wedding": "chateau wedding France castle couple",
    "french-alps-elopement": "elopement French Alps mountains couple",
    "riviera-honeymoon": "honeymoon couple French Riviera sea",
    "evjf": "hen party bachelorette group friends outdoors",
    "photo-scolaire": "school class photograph children group",
    "book-comedien": "actor headshot dramatic portrait",
    "seance-photo-anniversaire": "birthday celebration family party",
}


def do_cities() -> None:
    credits = load_credits()
    for slug, query in CITY_QUERIES.items():
        print(f"  {slug}")
        results = search(f"city-{slug}", query)["results"]
        if not results:
            print("    no results"); continue
        best = results[0]
        download(best["urls"]["raw"], Path(f"public/images/cities/{slug}.jpg"), 1600)
        credits[f"cities/{slug}"] = credit(best)
        # Three more for the gallery.
        for i, p in enumerate(results[1:4], 1):
            download(p["urls"]["raw"], Path(f"public/images/gallery/{slug}/{i}.jpg"), 1400)
            credits[f"gallery/{slug}/{i}"] = credit(p)
    save_credits(credits)


def do_services() -> None:
    credits = load_credits()
    for slug, query in SERVICE_QUERIES.items():
        print(f"  {slug}")
        results = search(f"svc-{slug}", query)["results"]
        if not results:
            print("    no results"); continue
        for i, p in enumerate(results[:5], 1):
            download(p["urls"]["raw"], Path(f"public/images/portfolio/{slug}/{i}.jpg"), 1400)
            credits[f"portfolio/{slug}/{i}"] = credit(p)
    save_credits(credits)


if __name__ == "__main__":
    what = sys.argv[1] if len(sys.argv) > 1 else "all"
    if what in ("cities", "all"):
        print("cities:"); do_cities()
    if what in ("services", "all"):
        print("services:"); do_services()
    print("done")
