#!/bin/sh

if [ "$DEBUG" = "true" ]; then
    exec uvicorn app.main:app --host 0.0.0.0 --port "${BLALALA_INTERNAL_PORT}" --reload
else
    exec uvicorn app.main:app --host 0.0.0.0 --port "${BLALALA_INTERNAL_PORT}" --no-server-header --no-date-header
fi