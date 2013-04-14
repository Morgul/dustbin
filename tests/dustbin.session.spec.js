//----------------------------------------------------------------------------------------------------------------------
// Tests for DustBin
//
// @module dustbin.spec.js
//----------------------------------------------------------------------------------------------------------------------

describe("DustBin Session Store", function()
{
    it("allows storage of objects.", function()
    {
        var key;
        var testStore = function()
        {
            key = bin.session.store("test_bin", "test_key", {foo:"bar"});
        };

        expect(testStore).not.toThrow();
        expect(key).toBe("test_key");
    });

    it("will automatically generate a key if one is not supplied.", function()
    {
        var key;
        var testStore = function()
        {
            key = bin.session.store("test_bin", {foo:"bar"});
        };

        expect(testStore).not.toThrow();
        expect(key).toBeDefined();
    });

    it("allows stored objects to be retrieved by the key they were stored with.", function()
    {
        var testObj = {foo:"bar"};
        var key = bin.session.store("test_bin", "test_key", testObj) ;

        var obj;
        var testGet = function()
        {
            obj = bin.session.get("test_bin", key);
        };

        expect(testGet).not.toThrow();
        expect(obj).toEqual(testObj);
    });

    it("allows stored objects to be retrieved by the key that was auto-generated.", function()
    {
        var testObj = {foo:"bar"};
        var key = bin.session.store("test_bin", testObj) ;

        var obj;
        var testGet = function()
        {
            obj = bin.session.get("test_bin", key);
        };

        expect(testGet).not.toThrow();
        expect(obj).toEqual(testObj);
    });

    it("allows retrieval of the bin directly.", function()
    {
        var testObj = {foo:"bar"};
        var key = bin.session.store("test_bin", testObj) ;

        var obj;
        var testGet = function()
        {
            obj = bin.session.get("test_bin")[key];
        };

        expect(testGet).not.toThrow();
        expect(obj).toEqual(testObj);
    });

    it("allows removal by key.", function()
    {
        var testObj = {foo:"bar"};
        var key = bin.session.store("test_bin", testObj) ;

        var obj;
        var testGet = function()
        {
            bin.session.remove("test_bin", key);
            obj = bin.session.get("test_bin")[key];
        };

        expect(testGet).not.toThrow();
        expect(obj).not.toBeDefined();
    });

    it("allows removal of the entire bin.", function()
    {
        var testObj = {foo:"bar"};
        var key = bin.session.store("test_bin", testObj);

        var binObj;
        var testGet = function()
        {
            bin.session.removeAllKeys("test_bin");
            binObj = bin.session.get("test_bin");
        };

        expect(testGet).not.toThrow();
        expect(binObj).toEqual({});
    });
});

//----------------------------------------------------------------------------------------------------------------------