import H "mo:base/HashMap";
import P "mo:base/Principal";

actor {
    var principalToDocument = H.HashMap<Principal,Text>(1, P.equal, P.hash); 
    public shared { caller} func store(document : Text) : async Text {
        principalToDocument.put(caller, document);
        "stored"
    };
    public shared query { caller } func getDocument() : async ? Text {
        principalToDocument.get(caller)
    }
};
