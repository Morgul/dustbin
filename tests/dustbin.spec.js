//----------------------------------------------------------------------------------------------------------------------
// Tests for DustBin
//
// @module dustbin.spec.js
//----------------------------------------------------------------------------------------------------------------------

describe("DustBin", function()
{
    afterEach(function()
    {
        Object.keys(localStorage).forEach(function(key)
        {

            delete localStorage[key];
        });
    });

    it("correctly initializes both local and session storage.", function()
    {
        expect(dustbin.local).toBeDefined();
        expect(dustbin.session).toBeDefined();
    });

    it("allows storage of objects.", function()
    {
        var key;
        var testStore = function()
        {
            key = dustbin.store("test_bin", "test_key", {foo:"bar"});
        };

        expect(testStore).not.toThrow();
        expect(key).toBe("test_key");
    });

    it("will automatically generate a key if one is not supplied.", function()
    {
        var key;
        var testStore = function()
        {
            key = dustbin.store("test_bin", {foo:"bar"});
        };

        expect(testStore).not.toThrow();
        expect(key).toBeDefined();
    });

    it("allows stored objects to be retrieved by the key they were stored with.", function()
    {
        var testObj = {foo:"bar"};
        var key = dustbin.store("test_bin", "test_key", testObj) ;

        var obj;
        var testGet = function()
        {
            obj = dustbin.get("test_bin", key);
        };

        expect(testGet).not.toThrow();
        expect(obj).toEqual(testObj);
    });

    it("allows stored objects to be retrieved by the key that was auto-generated.", function()
    {
        var testObj = {foo:"bar"};
        var key = dustbin.store("test_bin", testObj) ;

        var obj;
        var testGet = function()
        {
            obj = dustbin.get("test_bin", key);
        };

        expect(testGet).not.toThrow();
        expect(obj).toEqual(testObj);
    });

    it("generates correct metadata for stored objects.", function()
    {
        var testObj = {foo:"bar"};
        var key = dustbin.store("test_bin", "test_key", testObj) ;

        var obj = dustbin.get("test_bin", key);

        expect(obj.$metadata).toBeDefined();
        expect(obj.$metadata.key).toBe(key);
        expect(obj.$metadata.bin).toBe("test_bin");
        expect(typeof obj.$metadata.created).toBe("string");
        expect(typeof obj.$metadata.updated).toBe("string");
    });

    it("updates the metadata for modified objects.", function()
    {
        var testObj = {foo:"bar"};
        var key = "test_key";
        var obj;

        runs(function()
        {
            dustbin.store("test_bin", key, testObj) ;
            obj = dustbin.get("test_bin", key);
        });

        waits(1000);

        runs(function()
        {
            dustbin.store("test_bin", key, testObj) ;
            obj = dustbin.get("test_bin", key);

            expect(obj.$metadata.created).not.toEqual(obj.$metadata.updated);
        });
    });

    it("allows storage of objects with metadata, when specifying bucket..", function()
    {
        var testObj = {foo:"bar"};
        var key = dustbin.store("test_bin", "test_key", testObj) ;
        var obj = dustbin.get("test_bin", key);

        var newObj;
        var testObjStore = function()
        {
            dustbin.store("test_bin", obj);
            newObj = dustbin.get("test_bin", key);
        }; // end testObjStore

        expect(testObjStore).not.toThrow();
        expect(newObj).toBeDefined();
        expect(newObj).toEqual(obj);

    });

    it("allows direct storage of objects with metadata.", function()
    {
        var testObj = {foo:"bar"};
        var key = dustbin.store("test_bin", "test_key", testObj) ;
        var obj = dustbin.get("test_bin", key);

        var newObj;
        var testObjStore = function()
        {
            dustbin.store(obj);
            newObj = dustbin.get("test_bin", key);
        }; // end testObjStore

        expect(testObjStore).not.toThrow();
        expect(newObj).toBeDefined();
    });

    it("allows retrieval of the bin directly.", function()
    {
        var testObj = {foo:"bar"};
        var key = dustbin.store("test_bin", testObj) ;

        var obj;
        var testGet = function()
        {
            obj = dustbin.get("test_bin")[key];
        };

        expect(testGet).not.toThrow();
        expect(obj).toEqual(testObj);
    });

    it("allows removal by key.", function()
    {
        var testObj = {foo:"bar"};
        var key = dustbin.store("test_bin", testObj) ;

        var obj;
        var testGet = function()
        {
            dustbin.remove("test_bin", key);
            obj = dustbin.get("test_bin")[key];
        };

        expect(testGet).not.toThrow();
        expect(obj).not.toBeDefined();
    });

    it("allows removal of the entire bin.", function()
    {
        var testObj = {foo:"bar"};
        var key = dustbin.store("test_bin", testObj);

        var binObj;
        var testGet = function()
        {
            dustbin.removeAllKeys("test_bin");
            binObj = dustbin.get("test_bin");
        };

        expect(testGet).not.toThrow();
        expect(binObj).toEqual({});
    });

    it("allows basic query by values.", function()
    {
        var alex = {animal:"cat", name: "alex", age: 4};
        var izzy = {animal:"cat", name: "izzy", age: 4};
        var baal = {animal:"snake", name: "baal", age: 2};

        dustbin.store("pets", alex);
        dustbin.store("pets", izzy);
        dustbin.store("pets", baal);

        var cats;
        var testQuery = function()
        {
            cats = dustbin.query("pets", {animal: "cat"});
        };

        expect(testQuery).not.toThrow();
        expect(cats).toEqual([alex, izzy]);

        var pets = dustbin.query("pets");
        expect(pets).toEqual([alex, izzy, baal]);
    });
});

//----------------------------------------------------------------------------------------------------------------------