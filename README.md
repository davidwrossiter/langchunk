# Lang chunk

> I created langchunk to chunk entire codebases correctly.

RAG systems rely on data that has been properly chunked and embedded. Langchunk allows you to create high-quality chunks from any codebase including metadata about the file structure of the directory and the content of each file within it.

---

**Current capabilities**

- Allows for chunking of javascript source code.
- Chunks based on Function declaration, class declaration, variable declaration, and expression statements.

**Steps for future versions**

- Allow for different languages
- Generate embeddings for vector databases
