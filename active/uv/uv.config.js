self.__uv$config = {
    prefix: "/active/go/",
    bare: "https://vernmax-bare.netlify.app/", // You can replace this with your own Bare server instance if you have one
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: "/active/uv/uv.handler.js",
    bundle: "/active/uv/uv.bundle.js",
    config: "/active/uv/uv.config.js",
    sw: "/active/uv/uv.sw.js",
};
