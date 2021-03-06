function getAllInterfaces(ctor) {
    if (ctor.$metadata$ == null) ctor.$metadata$ = {};
    var metadata = ctor.$metadata$;
    if (metadata._allInterfaces === undefined) {
        var allInterfaces = metadata._allInterfaces = [];

        allInterfaces.push(ctor);

        var interfaces = metadata.interfaces;
        if (interfaces !== undefined) {
            for (var i = 0; i < interfaces.length; i++) {
                allInterfaces.push.apply(allInterfaces, getAllInterfaces(interfaces[i]));
            }
        }

        var superPrototype = ctor.prototype != null ? Object.getPrototypeOf(ctor.prototype) : null;
        var superConstructor = superPrototype != null ? superPrototype.constructor : null;
        if (superConstructor != null) {
            allInterfaces.push.apply(allInterfaces, getAllInterfaces(superConstructor));
        }
        // @TODO: faster remove duplicates
        metadata._allInterfaces = metadata._allInterfaces.filter(function(item, pos, self) { return self.indexOf(item) === pos; });
    }
    return metadata._allInterfaces;
}

function isInheritanceFromInterface(ctor, iface) {
    if (ctor === iface) return true;
    return getAllInterfaces(ctor).indexOf(iface) >= 0;
}
