import React from 'react'
import './Photo.css'
import Gallery from 'react-grid-gallery'
import photo from '../../assets/images/photo.png';

class Photo extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            group: 1,
            images: [],
            images_for_gallery: [],
            count: 0
        }
    }

    componentDidMount() {
        console.log('component did mount');
        fetch(`http://localhost:3003/pictures/${1}`)
        .then(response => response.json())
        .then(data => {
            const images = Object.values(data).map((value) => value.ImageName);
            const count = Object.keys(data).length;
            this.setState({ images, count});
            const images_for_gallery = images.map((img) => {
                return {
                    src: `http://localhost:3003/${img}`,
                    thumbnail: `http://localhost:3003/${img}`,
                    thumbnailWidth: 320,
                    thumbnailHeight: 174
            }
            })
            console.log(images_for_gallery);
            this.setState({images_for_gallery})
        })
        .catch(err => console.log(err))
    }

    handleFileInputClick = () =>  {
        const clickOn = document.getElementById("inputFile");
        clickOn.click();
    }

    handleNewImage = (event) => {
        const img = event.target.files[0];
        const type = img.type.split('/')[1];
        const name = `${this.state.group}-${this.state.count}.${type}`;
        var formData = new FormData();
        formData.append('photo', img, name);
        fetch('http://localhost:3003/pictures', {
            method: 'POST',
            body: formData
        })
        .then(data => console.log(data))
        .catch(err => console.log(err))
        
        this.setState({count: this.state.count + 1})
        this.setState(prevState => ({ images: [...prevState.images, name] }))

        fetch('http://localhost:3003/addpicture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: name,
            group: this.state.group
            })
        })
        .then(response => response.text())
        .then(data => window.alert(data))
        .catch(err => console.log(err))
    }

    render() {
        return(
            <div> 
                <div id="tooltip">
                    <button onClick={this.handleFileInputClick} id="button-plus">
                         <img src={photo} alt="plus" id="plus"/>
                     </button>
                    <span id="tooltiptext"> בחר תמונה</span>
                </div>
                
                <div id="galleryContent"> 
                   
                        <input 
                            type="file" 
                            id="inputFile" 
                            accept="image/x-png,image/gif,image/jpeg" 
                            onChange={this.handleNewImage}
                        />
                      
                    <h1>גלריה</h1>
                    <Gallery images={this.state.images_for_gallery}/>
                </div>
            </div>
        )
    }
}

export default Photo
