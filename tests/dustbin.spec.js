//----------------------------------------------------------------------------------------------------------------------
// Tests for DustBin
//
// @module dustbin.spec.js
//----------------------------------------------------------------------------------------------------------------------

describe("DustBin", function()
{
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
});

//----------------------------------------------------------------------------------------------------------------------