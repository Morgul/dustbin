//----------------------------------------------------------------------------------------------------------------------
// Tests for DustBin
//
// @module dustdustbin.spec.js
//----------------------------------------------------------------------------------------------------------------------

describe("DustBin Session Store", function()
{
    it("allows storage of objects.", function()
    {
        var key;
        var testStore = function()
        {
            key = dustbin.session.store("test_bin", "test_key", {foo:"bar"});
        };

        expect(testStore).not.toThrow();
        expect(key).toBe("test_key");
    });

    it("will automatically generate a key if one is not supplied.", function()
    {
        var key;
        var testStore = function()
        {
            key = dustbin.session.store("test_bin", {foo:"bar"});
        };

        expect(testStore).not.toThrow();
        expect(key).toBeDefined();
    });

    it("allows stored objects to be retrieved by the key they were stored with.", function()
    {
        var testObj = {foo:"bar"};
        var key = dustbin.session.store("test_bin", "test_key", testObj) ;

        var obj;
        var testGet = function()
        {
            obj = dustbin.session.get("test_bin", key);
        };

        expect(testGet).not.toThrow();
        expect(obj).toEqual(testObj);
    });

    it("allows stored objects to be retrieved by the key that was auto-generated.", function()
    {
        var testObj = {foo:"bar"};
        var key = dustbin.session.store("test_bin", testObj) ;

        var obj;
        var testGet = function()
        {
            obj = dustbin.session.get("test_bin", key);
        };

        expect(testGet).not.toThrow();
        expect(obj).toEqual(testObj);
    });

    it("allows retrieval of the bin directly.", function()
    {
        var testObj = {foo:"bar"};
        var key = dustbin.session.store("test_bin", testObj) ;

        var obj;
        var testGet = function()
        {
            obj = dustbin.session.get("test_bin")[key];
        };

        expect(testGet).not.toThrow();
        expect(obj).toEqual(testObj);
    });

    it("allows removal by key.", function()
    {
        var testObj = {foo:"bar"};
        var key = dustbin.session.store("test_bin", testObj) ;

        var obj;
        var testGet = function()
        {
            dustbin.session.remove("test_bin", key);
            obj = dustbin.session.get("test_bin")[key];
        };

        expect(testGet).not.toThrow();
        expect(obj).not.toBeDefined();
    });

    it("allows removal of the entire dustbin.", function()
    {
        var testObj = {foo:"bar"};
        var key = dustbin.session.store("test_bin", testObj);

        var binObj;
        var testGet = function()
        {
            dustbin.session.removeAllKeys("test_bin");
            binObj = dustbin.session.get("test_bin");
        };

        expect(testGet).not.toThrow();
        expect(binObj).toEqual({});
    });
});

//----------------------------------------------------------------------------------------------------------------------