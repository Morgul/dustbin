//----------------------------------------------------------------------------------------------------------------------
// Brief Description of dustbin.js.
//
// @module dustbin.js
//----------------------------------------------------------------------------------------------------------------------

(function()
{
    function BinStorage(storage)
    {
        this.storage = storage;
    } // end BinStorage

    BinStorage.prototype.get = function(binName, key)
    {
        var bin = this.storage[binName];

        if(key)
        {
            if(bin)
            {
                var obj = bin[key];
                if(obj)
                {
                    return JSON.parse(obj);
                }
                else
                {
                    console.error("Key \"%s\" not found.", key);
                }
            }
            else
            {
                console.error("Bin \"%s\" not found.", binName);
            } // end if
        }
        else
        {
            return bin;
        } // end if
    }; // end get

    BinStorage.store = function(binName, key, value)
    {
        this.storage[binName] = this.storage[binName] || {};

        if(!value)
        {
            value = key;

            // Generate key
            var hashCode = function(s)
            {
                return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
            }; // end hashCode

            key = window.btoa(hashCode(Math.random()));
        } // end if

        this.storage[binName][key] = JSON.stringify(value);
    }; // end store

    BinStorage.prototype.query = function(query)
    {
        console.error("Not Implemented yet!")
    }; // end query

    //------------------------------------------------------------------------------------------------------------------

    function DustBin()
    {
        if(typeof Storage !== "undefined")
        {
            this.local = new BinStorage(localStorage);
            this.session = new BinStorage(sessionStorage);
        }
        else
        {
            console.error("LocalStorage and SessionStorage are not available! Dustbin will not work.");
        } // end if
    } // end Bin

    DustBin.prototype.get = function(bin, key)
    {
        this.local.get(bin, key);
    }; // end get

    DustBin.prototype.store = function(bin, key, value)
    {
        this.local.store(bin, key, value);
    }; // end store

    //------------------------------------------------------------------------------------------------------------------

    // Put the bin object in the global namespace
    window.bin = new DustBin();
}());
//----------------------------------------------------------------------------------------------------------------------