# Helper functions for web scraping tasks
import re

def split_seasons(raw):
    # Split before a capital letter followed by a lowercase letter or digit
    # but only if it is NOT preceded by a space or dash
    parts = re.split(r'(?<![\s\-])(?=[A-Z][a-z0-9])', raw)
    return [p.strip() for p in parts if p.strip()]
