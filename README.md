# Astroproxy API
This is unofficial ESM API wrapper for https://astroproxy.com/ written on Typescript.

## Documentation
Typescript documentation is available [here](https://ivanmmm.github.io/astroproxy-node-api/)

## Basic usage
```
const astroproxyApi = new Astroproxy("YOUR_API_KEY");

const ports = await astroproxyApi.getPorts();

// Get Reset URL
console.log(ports[0].changeIpUrl.toString());
// Get Socks URL
console.log(ports[0].socksUrl.toString());
// Get HTTPS URL
console.log(ports[0].httpsUrl.toString());
// Get HTTP URL
console.log(ports[0].httpUrl.toString());

// Reset IP
await port[0].newIp();
```