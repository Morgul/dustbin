//----------------------------------------------------------------------------------------------------------------------
// Tests for DustBin
//
// @module dustbin.spec.js
//----------------------------------------------------------------------------------------------------------------------

describe("DustBin", function()
{
    it("correctly initializes both local and session storage.", function()
    {
        expect(bin.local).toBeDefined();
        expect(bin.session).toBeDefined();
    });

    it("allows storage of objects.", function()
    {
        var key;
        var testStore = function()
        {
            key = bin.store("test_bin", "test_key", {foo:"bar"});
        };

        expect(testStore).not.toThrow();
        expect(key).toBe("test_key");
    });

    it("will automatically generate a key if one is not supplied.", function()
    {
        var key;
        var testStore = function()
        {
            key = bin.store("test_bin", {foo:"bar"});
        };

        expect(testStore).not.toThrow();
        expect(key).toBeDefined();
    });

    it("allows stored objects to be retrieved by the key they were stored with.", function()
    {
        var testObj = {foo:"bar"};
        var key = bin.store("test_bin", "test_key", testObj) ;

        var obj;
        var testGet = function()
        {
            obj = bin.get("test_bin", key);
        };

        expect(testGet).not.toThrow();
        expect(obj).toEqual(testObj);
    });

    it("allows stored objects to be retrieved by the key that was auto-generated.", function()
    {
        var testObj = {foo:"bar"};
        var key = bin.store("test_bin", testObj) ;

        var obj;
        var testGet = function()
        {
            obj = bin.get("test_bin", key);
        };

        expect(testGet).not.toThrow();
        expect(obj).toEqual(testObj);
    });

    it("allows retrieval of the bin directly.", function()
    {
        var testObj = {foo:"bar"};
        var key = bin.store("test_bin", testObj) ;

        var obj;
        var testGet = function()
        {
            obj = bin.get("test_bin")[key];
        };

        expect(testGet).not.toThrow();
        expect(obj).toEqual(testObj);
    });

    it("allows removal by key.", function()
    {
        var testObj = {foo:"bar"};
        var key = bin.store("test_bin", testObj) ;

        var obj;
        var testGet = function()
        {
            bin.remove("test_bin", key);
            obj = bin.get("test_bin")[key];
        };

        expect(testGet).not.toThrow();
        expect(obj).not.toBeDefined();
    });

    it("allows removal of the entire bin.", function()
    {
        var testObj = {foo:"bar"};
        var key = bin.store("test_bin", testObj);

        var binObj;
        var testGet = function()
        {
            bin.removeAllKeys("test_bin");
            binObj = bin.get("test_bin");
        };

        expect(testGet).not.toThrow();
        expect(binObj).toEqual({});
    });
});

//----------------------------------------------------------------------------------------------------------------------