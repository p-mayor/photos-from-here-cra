import React from 'react';

class Display extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            photos: [],
            currentPhotoNum: 0,
            lat: 25.0343,
            lon: -77.3963
        }
    }

    componentDidMount() {
        let geo = navigator.geolocation

        geo.getCurrentPosition((loc) => {
            this.setState({ lat: loc.coords.latitude, lon: loc.coords.longitude })
            this.getPictures()
        }, (err) => {
            console.log(err.message)
            this.getPictures()
        })
    }

    getPictures() {
        let requestURL = `https://shrouded-mountain-15003.herokuapp.com/https://flickr.com/services/rest/?api_key=312e305e7062fdb7eb699961353a06bd&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=${this.state.lat}&lon=${this.state.lon}&text=dog`

        fetch(requestURL).then((response)=> {
            return response.json();
        }).then((json) => {
            this.setState({ photos: json.photos.photo })
        }).catch((err) => {
            console.log('Fetch problem: ' + err.message);
        });
    }

    constructImageURL(photoObj) {
        return "https://farm" + photoObj.farm +
            ".staticflickr.com/" + photoObj.server +
            "/" + photoObj.id + "_" + photoObj.secret + ".jpg";
    }

    clickHandler = (e) => {
        this.setState((prevState) => {
            return { currentPhotoNum: prevState.currentPhotoNum + 1 }
        })
    }

    render() {
        let currentPhoto = this.state.photos[this.state.currentPhotoNum]
        return (
            <div className="Display">
                <div>
                {this.state.photos.length && <img src={this.constructImageURL(currentPhoto)} alt={currentPhoto.title} />}
                </div>
                <div>
                    Latitude: {this.state.lat} Longitude: {this.state.lon}
                </div>
                <button onClick={this.clickHandler}>Next</button>
            </div>
        )
    }
}

export default Display;