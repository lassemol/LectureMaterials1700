const url = "https://data.stortinget.no/eksport/dagensrepresentanter?format=JSON";

async function run() {
    const res = await fetch(url);
    const data = await res.json();

    const reps = data.dagensrepresentanter_liste;

    const result = reps
        .map(r => ({
            firstname: r.fornavn,
            lastname: r.etternavn,
            party: r.parti?.navn,
        }))
        .sort((a, b) => {
            if (a.firstname < b.firstname) return -1;
            if (a.firstname > b.firstname) return 1;

            // first names are equal, compare last names
            if (a.lastname < b.lastname) return -1;
            if (a.lastname > b.lastname) return 1;
        });

    result.forEach(r => {
        console.log(
            `${r.firstname} ${r.lastname}, ${r.party}`
        );
    });
}

run().catch(console.error);