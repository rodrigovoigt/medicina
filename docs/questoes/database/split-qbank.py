import argparse
import csv
from pathlib import Path

parser = argparse.ArgumentParser(description="Divide o qbank.csv em fragmentos para hospedagem estática.")
parser.add_argument("source", nargs="?", type=Path, default=Path(__file__).with_name("qbank.csv"))
parser_args = parser.parse_args()
SOURCE = parser_args.source
LIMIT_BYTES = 45 * 1024 * 1024
csv.field_size_limit(2**31 - 1)

with SOURCE.open("r", encoding="utf-8-sig", newline="") as handle:
    reader = csv.reader(handle, delimiter="|", quotechar='"')
    headers = next(reader)
    part = 1
    output = None
    written = 0
    try:
        for row in reader:
            if output is None or written >= LIMIT_BYTES:
                if output is not None:
                    output.close()
                path = SOURCE.with_name(f"qbank-{part:03d}.csv")
                output = path.open("w", encoding="utf-8", newline="")
                header = "|".join(f'"{value.replace(chr(34), chr(34) * 2)}"' for value in headers) + "\n"
                output.write(header)
                written = len(header.encode("utf-8"))
                part += 1

            fields = []
            for value in row:
                if any(char in value for char in ("|", '"', "\n", "\r")):
                    fields.append('"' + value.replace('"', '""') + '"')
                else:
                    fields.append(value)
            record = "|".join(fields) + "\n"
            output.write(record)
            written += len(record.encode("utf-8"))
    finally:
        if output is not None:
            output.close()

print(f"Gerados {part - 1} fragmentos")
