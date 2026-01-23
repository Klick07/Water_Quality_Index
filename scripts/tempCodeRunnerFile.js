const raw=JSON.parse(
    fs.readFileSync(path.join(__dirname, '../data/gangaData.json'),'utf-8') );
    const data=raw.stations;