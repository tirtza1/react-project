import React from 'react'
import './Photo.css'
import { Gallery, Item } from 'react-photoswipe-gallery'

class Photo extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            group: 1,
            images: [],
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
            <div id="gallery">
                <h1>גלריה</h1>
                <input 
                    type="file" 
                    id="inputFile" 
                    accept="image/x-png,image/gif,image/jpeg" 
                    onChange={this.handleNewImage}
                />
                <button onClick={this.handleFileInputClick}>העלאת תמונה</button>
                <Gallery>
                    {
                        this.state.images.map(({ img, i }) => {
                            return <Item
                              key={i}
                              original={`http://localhost:3003/${img}`}
                              width="1024"
                              height="768"
                            />
                        })
                    }
                </Gallery>
    
                
            </div>
        )
    }
}

export default Photo