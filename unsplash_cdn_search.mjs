import ZAI from 'z-ai-web-dev-sdk';

const zai = await ZAI.create();

const searches = [
  { query: "images.unsplash.com photo dam water", cat: "dam" },
  { query: "images.unsplash.com photo wind turbine farm", cat: "wind" },
  { query: "images.unsplash.com photo construction crane building", cat: "construction" },
  { query: "images.unsplash.com photo industrial port shipping", cat: "port" },
  { query: "images.unsplash.com photo vertical farming greenhouse", cat: "farming" },
  { query: "images.unsplash.com photo satellite earth orbit", cat: "satellite" },
  { query: "images.unsplash.com photo stock exchange trading", cat: "trading" },
  { query: "images.unsplash.com photo server room data center", cat: "server" },
  { query: "images.unsplash.com photo mining open pit excavator", cat: "mining" },
  { query: "images.unsplash.com photo cement factory industrial", cat: "cement" },
  { query: "images.unsplash.com photo solar panel farm energy", cat: "solar" },
  { query: "images.unsplash.com photo power grid substation", cat: "power" },
  { query: "images.unsplash.com photo aerial drone crops agriculture", cat: "agriculture" },
  { query: "images.unsplash.com photo Casablanca Morocco", cat: "casablanca" },
  { query: "images.unsplash.com photo cybersecurity SOC monitor", cat: "cybersecurity" },
];

const allUrls = {};

for (const search of searches) {
  try {
    const results = await zai.functions.invoke('web_search', {
      query: search.query,
      num: 10
    });
    
    const cdnUrls = results
      .filter(r => r.url && r.url.includes('images.unsplash.com/photo-'))
      .map(r => ({ url: r.url.split('?')[0], name: r.name }));
    
    allUrls[search.cat] = cdnUrls;
    console.error(`${search.cat}: found ${cdnUrls.length} CDN URLs`);
  } catch (e) {
    console.error(`${search.cat}: error - ${e.message}`);
  }
}

console.log(JSON.stringify(allUrls, null, 2));
