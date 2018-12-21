#!/bin/bash
set -e

service mongodb start

exec "$@"