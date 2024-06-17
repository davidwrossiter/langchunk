# Lang chunk

> I created langchunk to chunk entire codebases correctly.

RAG systems rely on data that has been properly chunked and embedded. Langchunk allows you to create high-quality chunks from any codebase including information about the file structure of the directory and the content of each file within it.

---

Steps to complete:

1. Get all information from a given directory
2. Chunk the information of each file and include metadata about its relative file location
3. Create embeddings for the entire directory, the dependencies, file structure etc.
