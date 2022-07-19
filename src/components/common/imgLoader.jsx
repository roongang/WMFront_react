const imgLoader = async e => {
    const reader = e.getReader();
    const chunks = await readAllChunks(reader);
    const blob = new Blob(chunks);
    const url = window.URL.createObjectURL(blob);
    return url;
  }

const readAllChunks = async reader => {
    const chunks = [];
    while(true){
        const {value, done} = await reader.read();
        if (done) break;
        chunks.push(value);
    }
    return chunks;
}


export default imgLoader;