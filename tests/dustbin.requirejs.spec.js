//----------------------------------------------------------------------------------------------------------------------
// Tests that dustbin can be used by RequireJS.
//
// @module dustbin.requirejs.spec.js
//----------------------------------------------------------------------------------------------------------------------

require.config({
    paths: {
        dustbin: '/base/dustbin'
    }
});

describe("DustBin RequireJS", function()
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
        var dust;
        require(['dustbin'], function(dustbin)
        {
            dust = dustbin;
        });

        expect(dustbin.local).toBeDefined();
        expect(dustbin.session).toBeDefined();
    });
});

//----------------------------------------------------------------------------------------------------------------------