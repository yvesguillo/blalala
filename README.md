# Blalala
***Change the tone. Keep the meaning***.  

![Blalala](/images/blalala.avif)

A web browser extension that let you change the current web page written content to the tone and mood that suits you the best.  
That is right; just as you would do with your favorite LLM chat, copying and pasting from a tab to another but this time the LLM model runs on your machine, and you do it with one prompt from the same page.

## Why Blalala?
Sometimes you just want to keep the author's life story for later tonight and move straight to the recipe. Or maybe some concepts from another scientific field could apply to your project.  
Productivity, education, accessibility, here are **some transformations suggestions**:
- Concise rewriting.
- Telegraphic style.
- Jargon and terminology annotations.
- Field of expertise shift.
- Analogy.
- Reading-level adaptation.
- Plain-language rewriting.
- Translation.
- Point of view switch or shift.

**For Fun!**:
You got this. “*Replace all reference to "Block-Chain" with a random Pokémon name.*”, “*Alter the text to make it sound like it is read out loud by Sean Connery.*”, “*Make it rhyme!*”…

> If you find a good one, please share it!

## Getting Started

### Requirements
1. ***Docker***
2. ***Node.js***
3. ***TypeScript***
4. ***Chrome*** or ***Chromium*** browser  
    > This MVP does not support Gecko browser like ***Firefox*** yet.

### Installation
Pull this project and enter it:
```bash
git clone https://github.com/yvesguillo/blalala.git
cd blalala
```

#### Start API and LLM services
1. Get into Blalala Server's folder
    ```bash
    cd blalala-server
    ```

1. Check the LLM choice and edit if needed:
    ```bash
    cat .env
    ```
    > You may also edit DEBUG status if needed. `DEBUG=true` will allow FastAPI watching, `/docs`, `/redoc` and `/openapi.json` routes as well as more info on HTTP request headers.

1. Build containers to start services:
    ```bash
    docker compose up --build
    ```
This will build Blalala API service and Ollama then pull the default LLM model.

##### Quick API test:
1. On [`http://localhost:3000/docs#/default/transform_text_transform_post`](http://localhost:3000/docs#/default/transform_text_transform_post)…
2. try:  
    ```json
    {
      "text": "Kouign-amann is a traditional pastry from Brittany, France. It is made from a laminated dough containing flour, water, yeast, butter, and sugar. The dough is folded several times, creating many thin layers similar to puff pastry. During baking, the butter melts and the sugar caramelizes, producing a crisp, golden exterior and a rich, tender interior. The pastry is often served warm and is appreciated for its intense buttery flavor and delicate crunch. A typical kouign-amann contains a significant amount of butter and sugar, making it one of the richest pastries in French baking. Despite its caloric density, it remains a beloved specialty and an iconic part of Breton culinary heritage. To prepare a kouign-amann, the dough is first mixed and allowed to rise. Butter and sugar are then enclosed in the dough before several rounds of folding and resting. The pastry is finally shaped, baked until deeply caramelized, and allowed to cool slightly before serving.",
      "persona": "alien social scientist",
      "tone": "grave",
      "style": "descriptive",
      "custom_instruction": "Analyze the pastry as if it were an important cultural ritual performed by the human species. Show concern about the extraordinary concentration of calories, butter, and sugar while remaining respectful and scientific."
    }
    ```

> By default, the Docker stack automatically downloads the model specified in `blalala-server/.env` during the first startup.  
Cached model are stored in the Ollama volume (`ollama_data`).

#### Install browser extension
1. **Build the extension**:  
    Moves to `./blalala-extension/` folder then transpile TypScripts files and copy static contents from `./public` to `./build`:
    ```bash
    npm ci
    npx tsc
    cp ./public/* ./build/
    ```
1. **Install on you web Browser**:  
    Option A. On ***Chrome*** or ***Chromium*** browsers:  
    1. Navigate to [`chrome://extensions/`](chrome://extensions/).
    1. Allow ***Developer mode*** (top left switch).
    1. Click `[Load unpacked]`.
    1. Navigate to this project's `./blalala-extension/build/` folder and click `[Select]`.

    Option B. On ***Firefox*** or ***Gecko*** browsers:
    1. *TBD…*

You should now be able to access the extension and expand it on any web pages.

##### Quick Extension test:
1. On Chromium browser, navigate to a short and simple page e.g: [`https://www.google.com/404`](https://www.google.com/404) (to limit texts contents amount). 
1. Click the *Blalala* `(B)` extension icon from top right menu bar to open the popup menu.
1. Set some transformation options and click `[Transform tone]` button.

> **(!)** The client system is very demanding, and generate a lot of request. Responses are slow and not optimized for now. Try it on low contents web pages, or you might not see much opening.  

## Features

### Current version: MVP
- Extension popup activation.
- Current page text node collection.
- Tone transformation controls.  
  *Persona / Role, Personality / Style, Context / Situation, Custom instructions*

### Roadmap & Crazy Ideas
- Parametrized context depth.
- Target language.  
  *Same, EN, FR, …*
- Restore original content.
- Contexts configuration simplification.
- Context presets.
- Context size automatic optimization.
- Tone transformation presets.
- User's persistent preferences.

## Known limitations

- This MVP does not persist user exchange history yet.
- No authentication is implemented.
- The browser extension is experimental and can generate many API requests on text-heavy pages.
- Some Text Nodes elements are not textual content and are missused, such `<style>` elements.

## How does it work?

### Technologies
- **Browser Extension**
    - WebExtension API (Chrome, Chromium, Firefox, and compatibles)
    - JavaScript (***TBC***, TypeScript?)
    - HTML / CSS

- **REST API**
    - Python
    - FastAPI
    - Pydantic

- **LLM Integration**
    - Ollama (local inference)
    - Model : `qwen3:1.7b`

- **Interfacing**
    - REST
    - JSON
    - HTTPS

### Components
- Web Browser
    - Blalala Browser Extension.
        - Pop-up user's interface.
        - Text nodes fetching.
        - Prompt preparation and formatting.
        - Blalala API requests handling.
    - Fetched web page content.

- LLM web service
    - Blalala REST API.
    - Ollama engine.
    - LLM model.

### Project Files
```
blalala/
 ├─ blalala-extension/
 │   ├─ public/
 │   │   ├─ manifest.json
 │   │   ├─ popup.css
 │   │   └─ popup.html
 │   ├─ src/
 │   │   ├─ control/
 │   │   │   └─ submit.ts
 │   │   ├─ model/
 │   │   │   └─ dom-scanner.ts
 │   │   ├─ api.ts
 │   │   ├─ globals.d.ts
 │   │   └─ popup.ts
 │   ├─ package-lock.json
 │   ├─ package.json
 │   └─ tsconfig.json
 └─ blalala-server/                   # Holds the Blalala API services sources.
     ├─ app/
     │   ├─ schemas/
     │   │   └─ transform.py
     │   ├─ services/
     │   │   ├─ ollama_service.py
     │   │   └─ transform_service.py
     │   ├─ config.py
     │   └─ main.py
     ├─ .dockerignore
     ├─ .env                          # Hold som usefull setup variables such as LLM choice.
     ├─ docker-compose.yml
     ├─ Dockerfile.blalala.api        # Lightweight image build for Blalala API.
     ├─ entrypoint.blalala.api.sh     # Scripted Uvicorn start (for DEBUG True/False).
     └─ requirements.blalala.api.txt
```

### Diagrams

#### API Server startup
|  |
| :-: |
| `docker compose up` |
| ↓ |
| ollama healthy |
| ↓ |
| ollama-init pulls model |
| ↓ |
| blalala server starts |
| ↓ |
| `entrypoint.sh` |
| ↓ |
| Blalala uvicorn API starts |
| ↓ |
| [`http://localhost:3000/`](http://localhost:3000/) |

#### Browser Extension flow
|  |
| :-: |
| Web page |
| ↓ |
| Text extraction |
| ↓ |
| Context preparation |
| ↓ |
| REST API |
| ↓ |
| LLM |
| ↓ |
| Tone transformation |
| ↓ |
| Page update |

## Contributing
Got ideas? Spot a bug? Wanna make this thing even cooler?  
Feel free to fork, star, or [open an issue](https://github.com/yvesguillo/blalala/issues); we’d love to hear from you!

## References and thanks

### Core technologies

- [FastAPI](https://fastapi.tiangolo.com/) - Python web framework used to expose the REST API.
- [Pydantic](https://docs.pydantic.dev/) - Data validation and serialization.
- [Ollama](https://ollama.com/) - Local LLM inference engine.
- [Qwen3](https://qwenlm.github.io/) - Default language model used during development.
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) - Containerization and service orchestration.
- [TypeScript](https://www.typescriptlang.org/) - Browser extension development.
- [Chrome Extensions Manifest V3](https://developer.chrome.com/docs/extensions/develop/migrate/what-is-mv3) - Browser extension platform.
- [WebExtensions API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions) - Cross-browser extension compatibility reference.

### Documentation and learning resources

- [FastAPI documentation](https://fastapi.tiangolo.com/)
- [Ollama API reference](https://github.com/ollama/ollama/blob/main/docs/api.md)
- [MDN Web Docs](https://developer.mozilla.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Docker documentation](https://docs.docker.com/)
- [VS Code Dev Containers documentation](https://code.visualstudio.com/docs/devcontainers/containers)

### Tools
- [VS Code](https://github.com/microsoft/vscode)
- [LTeX+](https://github.com/ltex-plus/vscode-ltex-plus) - plugin for ***VS Code***
- [Cloudconvert](https://cloudconvert.com/png-to-avif) - PNG to AVIF Converter
- [Crawlect](https://pypi.org/project/Crawlect/) - Project structure documentation generation.

### AI agents:
- **ChatGPT** (online chat)
- **Google Gemini** (on **Google Search**)

> ### Credit and origination acknowledgement
> Credit and origination acknowledgement of original patterns or snippets have bee willingfully enforced to our best effort.  
If you believe we used some of your work and omitted to mention it, we deeply apologize and encourage you to inform us through the project [issues](https://github.com/yvesguillo/blalala/issues) or at [yves@yvesguillo.ch](mailto:yves@yvesguillo.ch).

## AI manifest
Because this project is a learning project, we contain AI tools and LLM generated contents usage to three main axes:

1. Challenge:
    - Project scope proofing.
    - Ideation material.

2. Guidance:
    - Development standards.
    - Good practices.
    - Syntaxes.

3. Analysis:
    - Code review.
    - Spelling and grammar check / correction.

### Principle and key ideas
Maintain project ownership via mindful use of AI and Web-Search assistance.

#### 1. Incremental Ownership
Each features, algorithm or any piece of creativity are initiated by us and decomposed with much granularity possible by us before any use or challenged by AI tools.

#### 2. No Copy/Past policy.
Any syntax, pattern or any other snippet of such, suggested by AI or Web-Search results, have been rewritten to enforce knowledge integration critical approach and creativity.

#### 3. “*Do not touch my keyboard!*”
For Typing Flow, Stream of Mind Preservation and creativity sake; **with exception to orthographic and grammar check**, **AI tools** and “advanced” auto-completion tools have been **strictly forbidden inside IDEs** during this project conception.

#### 4. “*Thanks, are you sure though?*”
AI LLM agents proposition and assertions have been challenged as it would have been with a peer.  

#### 5. Learning over optimization
Concepts are first implemented in their simplest understandable form before (if ever) being optimized. As long as a concept is not integrated and becomes “*natural*”, understanding is prioritized over efficiency.

> To a lighter note, I personally consider AI LLM agent as highly volunteer yet fallible digital consulting team members.

#### 6. “Do your magic”
Some topics deemed out of training scope or field of expertise have been fully or broadly delegate to generative AI and LLM:
- Orthographic and Grammar correction.
- Illustration generation.

## Do you like Blalala?
If you find Blalala useful, **give it a ☆** to support the project!  
[![GitHub Repo stars](https://img.shields.io/github/stars/yvesguillo/blalala?style=social)](#)
