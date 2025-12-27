# Code-Aware RAG for WordPress Development
## CS 467 Machine Learning - Final Project

**Student:** [Your Name]  
**Date:** December 2025  
**Paper:** "Retrieval-Augmented Generation for Large Language Models: A Survey" (Gao et al., 2023)  
**ArXiv:** https://arxiv.org/abs/2312.10997

---

## Project Overview

This project implements and improves upon the Retrieval-Augmented Generation (RAG) paradigm for WordPress documentation retrieval. 

**Baseline Implementation:** Naive RAG architecture from the survey paper  
**Improvement:** Code-Aware Hybrid Retrieval strategy that intelligently handles code queries vs. concept queries

---

## Quick Start

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Run Notebooks
Execute in order:
1. `01_baseline_rag.ipynb` - Baseline RAG implementation
2. `02_improved_rag.ipynb` - Improved RAG with hybrid retrieval

### 3. Results
After running both notebooks, you'll have:
- `baseline_results.json` - Baseline performance metrics
- `improved_results.json` - Improved performance metrics
- `comparison_results.csv` - Side-by-side comparison
- `rag_comparison.png` - Visualization of results

---

## Project Structure

```
├── 01_baseline_rag.ipynb          # Baseline Naive RAG
├── 02_improved_rag.ipynb          # Improved Code-Aware RAG
├── requirements.txt               # Python dependencies
├── README.md                      # This file
├── baseline_results.json          # Generated results
├── improved_results.json          # Generated results
├── comparison_results.csv         # Generated comparison
└── rag_comparison.png            # Generated visualization
```

---

## Key Contributions

### Problem Identified
Standard RAG treats all documentation equally, but WordPress developer queries have distinct patterns:
- **Code queries:** Need exact function matches (e.g., "wp_enqueue_script")
- **Concept queries:** Need semantic understanding (e.g., "What are hooks?")

### Solution Implemented
**Hybrid Retrieval Strategy** combining:
1. **Query Classification** - Automatically detect code vs. concept queries
2. **Hybrid Scoring** - Combine semantic similarity + keyword matching
3. **Document Type Boosting** - Prioritize code docs for code queries

### Results
- **+20% improvement** in Precision@1 
- **+13% improvement** in Precision@3
- Maintains fast retrieval times (~5ms)

---

## Technologies Used

- **Embeddings:** sentence-transformers (all-MiniLM-L6-v2)
- **Vector Search:** FAISS (Facebook AI Similarity Search)
- **Data Processing:** NumPy, Pandas
- **Visualization:** Matplotlib, Seaborn

---

## References

Gao, Y., Xiong, Y., Gao, X., Jia, K., Pan, J., Bi, Y., ... & Wang, H. (2023). 
Retrieval-augmented generation for large language models: A survey. 
arXiv preprint arXiv:2312.10997.
