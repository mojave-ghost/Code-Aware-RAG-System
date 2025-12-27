# Quick Start - Code-Aware RAG System

Get up and running in 3 minutes.

---

## Step 1: Install Dependencies (1 minute)

```bash
pip install -r requirements.txt
```

**What this installs:**
- Flask (web API)
- Sentence-transformers (text embeddings)
- FAISS (vector search)
- Supporting libraries

**First-time note:** The embedding model (~90MB) downloads automatically on first run.

---

## Step 2: Start the Backend (30 seconds)

```bash
python app.py
```

**You should see:**
```
[INIT] Loading model: all-MiniLM-L6-v2
[INDEX] Indexing 10 documents...
[INDEX] Completed in 2.15s
[APP] RAG system ready!
 * Running on http://127.0.0.1:5000
```

**✓ Keep this terminal running!**

---

## Step 3: Open the Website (10 seconds)

**Option A - Direct file:**
- Double-click `index.html`
- Or drag it into your browser

**Option B - Command line:**
```bash
# Windows
start index.html

# Mac
open index.html

# Linux
xdg-open index.html
```

**Look for:** Green "Live RAG System" indicator at the top of the demo section.

---

## Step 4: Try It Out! (1 minute)

Type these questions in the chat:

### Code Query Example
```
How do I use wp_enqueue_script?
```

**Expected:**
- Query classified as CODE
- Top result: "wp_enqueue_script Function"
- Shows syntax and usage

### Concept Query Example
```
What are WordPress hooks?
```

**Expected:**
- Query classified as CONCEPT
- Top result: "WordPress Hooks Overview"
- Shows conceptual explanation

---

## You're Done! 🎉

**What you have:**
- Live RAG system running locally
- Interactive web interface
- Real-time query processing
- Source attribution with relevance scores

---

## Next Steps

### Explore the Code
- `app.py` - Backend RAG implementation (lines 46-155)
- `script.js` - Frontend API integration (lines 91-158)
- `index.html` - Website structure

### Run the Research Notebooks
```bash
jupyter notebook
```

Open and run:
1. `01_baseline_rag.ipynb` - See baseline implementation
2. `02_improved_rag.ipynb` - See improvements and comparisons

### Customize
- Add more WordPress docs in `app.py` (line 19)
- Change retrieval parameters (k value, scoring weights)
- Update website styling in `styles.css`

---

## Troubleshooting

### "Module not found"
```bash
pip install -r requirements.txt --force-reinstall
```

### API not connecting
1. Make sure `python app.py` is still running
2. Check for port conflicts (default: 5000)
3. Visit `http://127.0.0.1:5000/health` in browser

### "Demo Mode" shows instead of "Live RAG System"
- Backend isn't running - start it with `python app.py`
- Port mismatch - check console for errors
- Refresh the webpage after starting backend

---

## Full Documentation

- **SETUP.md** - Detailed setup and deployment guide
- **PORTFOLIO.md** - Complete technical documentation
- **README.md** - Project overview

---

**Questions?** Check the troubleshooting section in SETUP.md
