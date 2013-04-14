//----------------------------------------------------------------------------------------------------------------------
// Brief Description of dustbin.js.
//
// Copyright (c) 2013 Christopher S. Case
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
// documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
// Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
// WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//
// @module dustbin.js
//----------------------------------------------------------------------------------------------------------------------

(function()
{
    function BinStorage(storage)
    {
        this.storage = storage;
    } // end BinStorage

    BinStorage.prototype.get = function(bin, key)
    {
        var binObj = this._get_bin(bin);

        if(key)
        {
            if(binObj)
            {
                var obj = binObj[key];
                if(obj)
                {
                    return obj;
                }
                else
                {
                    console.error("Key \"%s\" not found.", key);
                    return undefined;
                }
            }
            else
            {
                console.error("Bin \"%s\" not found.", bin);
                return undefined;
            } // end if
        }
        else
        {
            return binObj;
        } // end if
    }; // end get

    BinStorage.prototype.store = function(bin, key, value)
    {
        var binObj = this._get_bin(bin);

        if(!value)
        {
            value = key;
            var unique = false;

            while(unique)
            {
                // Generate a new key that is highly likely to be unique.
                key = this._generate_key();

                if(!binObj[key])
                {
                    unique = true;
                } // end if
            } // end while
        } // end if

        // Store on our bin object
        binObj[key] = value;

        // We need to replace the bin object with the modified one.
        this._set_bin(bin, binObj);

        // Return the key, in case we auto-generated one.
        return key;
    }; // end store

    BinStorage.prototype.remove = function(bin, key)
    {
        var binObj = this._get_bin(bin);

        delete binObj[key];
        this._set_bin(bin, binObj);
    }; // end remove

    BinStorage.prototype.removeAllKeys = function(bin)
    {
        delete this.storage[bin];
    }; // end removeAllKeys

    BinStorage.prototype.query = function(query)
    {
        console.error("Not Implemented yet!")
    }; // end query

    //-------------------------------------------------------------------------
    // Helpers
    //-------------------------------------------------------------------------

    BinStorage.prototype._set_bin = function(bin, binObj)
    {
        this.storage[bin] = JSON.stringify(binObj);
    };

    BinStorage.prototype._get_bin = function(bin)
    {
        var binObj = this.storage[bin] || "{}";
        return JSON.parse(binObj);
    };

    BinStorage.prototype._generate_key = function()
    {
        // Generate key
        var hashCode = function(s)
        {
            if(typeof s != "string")
            {
                s = String(s);
            } // end if

            return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
        }; // end hashCode

        return window.btoa(hashCode(Math.random()));
    }; // end generate_key

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
        return this.local.get(bin, key);
    }; // end get

    DustBin.prototype.store = function(bin, key, value)
    {
        return this.local.store(bin, key, value);
    }; // end store

    DustBin.prototype.remove = function(bin, key)
    {
        return this.local.remove(bin, key);
    }; // end remove

    DustBin.prototype.removeAllKeys = function(bin)
    {
        return this.local.removeAllKeys(bin);
    }; // end removeAllKeys

    //------------------------------------------------------------------------------------------------------------------

    // Put the bin object in the global namespace
    window.dustbin = new DustBin();
}());
//----------------------------------------------------------------------------------------------------------------------