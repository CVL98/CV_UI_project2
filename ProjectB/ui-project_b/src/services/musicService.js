'use strict'; 

//WebApi service broken out in a class to give CRUD musicGroup, Album and Artist
class musicService {

    constructor (url)
    {
        this.url = url;
    }

    //#region private generic CRUD methods
    async #_myFetch(url, method = null, body = null) {
      try {
        method ??= 'GET';
        
        // Log the URL and method to the console
        console.log(`Making ${method} request to URL: ${url}`);
        
        let res = await fetch(url, {
          method: method,
          headers: { 'content-type': 'application/json' },
          body: body ? JSON.stringify(body) : null
        });
    
        if (res.ok) {
          console.log(`\n${method} Request successful @ ${url}`);
    
          //get the data from server
          let data = await res.json();
          return data;
        } else {
          //typically you would log an error instead
          console.log(`Failed to receive data from server: ${res.status}`);
          alert(`Failed to receive data from server: ${res.status}`);
        }
      } catch (err) {
        //typically you would log an error instead
        console.log(`Failed to receive data from server: ${err.message}`);
        alert(`Failed to receive data from server: ${err.message}`);
      }
    }

    async #_readItemsAsync(reqUrl, pageNr, flat, filter, pageSize) {
      reqUrl += `?flat=${flat}&pageNr=${pageNr}&pageSize=${pageSize}`;
      if (filter != null) {
        reqUrl += `&filter=${filter}`
      }
      
      // Log the final URL with query parameters to the console
      console.log(`Final URL for _readItemsAsync: ${reqUrl}`);
      
      let data = await this.#_myFetch(reqUrl);
      return data;
    }
    
    async #_readItemAsync(reqUrl, id, flat) {
      reqUrl += `?flat=${flat}&id=${id}`;
      
      // Log the final URL with query parameters to the console
      console.log(`Final URL for _readItemAsync: ${reqUrl}`);
      
      let data = await this.#_myFetch(reqUrl);
      return data;
    }

    async #_readItemDtoAsync(reqUrl, id) {
      reqUrl += `?id=${id}`;
      
      // Log the final URL with query parameters to the console
      console.log(`Final URL for _readItemDtoAsync: ${reqUrl}`);
      
      let data = await this.#_myFetch(reqUrl);
      return data;
    }

    async #_updateItemAsync(reqUrl, id, newItem) {
      reqUrl += `/${id}`;
      
      // Log the final URL with query parameters to the console
      console.log(`Final URL for _updateItemAsync: ${reqUrl}`);
      
      let data = await this.#_myFetch(reqUrl, 'PUT', newItem);
      return data;
    }

    async #_createItemAsync(reqUrl, newItem) {
      
      // Log the final URL with query parameters to the console
      console.log(`Final URL for _createItemAsync: ${reqUrl}`);
      
      let data = await this.#_myFetch(reqUrl, 'POST', newItem);
      return data;
    }

    async #_deleteItemAsync(reqUrl, id) {
      reqUrl += `/${id}`;
      
      // Log the final URL with query parameters to the console
      console.log(`Final URL for _deleteItemAsync: ${reqUrl}`);
      
      let data = await this.#_myFetch(reqUrl, 'DELETE');
      return data;
    }

    async #_upsertItemAsync(reqUrl, newItem) {
      
      // Log the final URL with query parameters to the console
      console.log(`Final URL for _upsertItemAsync: ${reqUrl}`);
      
      let data = await this.#_myFetch(reqUrl, 'POST', newItem);
      return data;
    }
    //#endregion

    async readInfoAsync() {
      return await this.#_myFetch(`${this.url}/csAdmin/Info`);
    }

    //#region CRUD MusicGroup
    //using traditional function syntax (like in C#)
    async readMusicGroupsAsync(pageNr, flat=false, filter=null, pageSize=10) {
      return await this.#_readItemsAsync(`${this.url}/csMusicGroups/Read`, pageNr, flat, filter, pageSize);
    }
    
    //using JavaScrip's ability to assign a function to a variable or property (like c# delegate)
    readMusicGroupAsync = async (id, flat=true) => this.#_readItemAsync(`${this.url}/csMusicGroups/ReadItem`, id, flat);
    
    readMusicGroupDtoAsync = async (id, flat=true) => this.#_readItemDtoAsync(`${this.url}/csMusicGroups/ReadItemDto`, id, flat);
    
    updateMusicGroupAsync = async (id, newItem) => this.#_updateItemAsync(`${this.url}/csMusicGroups/UpdateItem`, id, newItem);
  
    createMusicGroupAsync = async (newItem) => this.#_createItemAsync(`${this.url}/csMusicGroups/CreateItem`, newItem);
 
    deleteMusicGroupAsync = async (id) => this.#_deleteItemAsync(`${this.url}/csMusicGroups/DeleteItem`, id);
    //#endregion

    //#region CRUD Album
    readAlbumsAsync = async (pageNr, flat=false, filter=null, pageSize=10) => this.#_readItemsAsync(`${this.url}/csAlbums/Read`, pageNr, flat, filter, pageSize);
    
    readAlbumAsync  = async (id, flat=true) => this.#_readItemAsync(`${this.url}/csAlbums/ReadItem`, id, flat);

    readAlbumDtoAsync = async (id) => this.#_readItemDtoAsync(`${this.url}/csAlbums/ReadItemDto`, id);

    updateAlbumAsync = async (id, newItem) => this.#_updateItemAsync(`${this.url}/csAlbums/UpdateItem`, id, newItem);

    createAlbumAsync = async (newItem) => this.#_createItemAsync(`${this.url}/csAlbums/CreateItem`, newItem);

    deleteAlbumAsync = async (id) => this.#_deleteItemAsync(`${this.url}/csAlbums/DeleteItem`, id);
    //#endregion
    
    //#region CRUD Artist
    readArtistsAsync = async (pageNr, flat=false, filter=null, pageSize=10) => this.#_readItemsAsync(`${this.url}/csArtists/Read`, pageNr, flat, filter, pageSize);
    
    readArtistAsync = async (id, flat=true) => this.#_readItemAsync(`${this.url}/csArtists/ReadItem`, id, flat);

    readArtistDtoAsync = async (id, flat=true) => this.#_readItemDtoAsync(`${this.url}/csArtists/ReadItemDto`, id);
    
    updateArtistAsync = async (id, newItem) => this.#_updateItemAsync(`${this.url}/csArtists/UpdateItem`, id, newItem);

    upsertArtistAsync = async (newItem) => this.#_upsertItemAsync(`${this.url}/csArtists/UpsertItem`, newItem);

    deleteArtistAsync = async (id) => this.#_deleteItemAsync(`${this.url}/csArtists/DeleteItem`, id);
    //#endregion
}

export default musicService;
