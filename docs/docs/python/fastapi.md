---
sidebar_position: 2
---

# FastApi

## Guide
[FastApi Guide](https://fastapi.tiangolo.com/tutorial/)

## Commands
### Development run
For a Python file `main.py` having FastAPI() variable as app
```bash
uvicorn main:app --reload
```

```python title=main.py
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}
```
