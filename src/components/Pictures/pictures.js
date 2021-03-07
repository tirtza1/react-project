import React ,{Component}from 'react'
import axios from 'axios'
//import classes from './pictures.css'

export default class Pictures extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pictures: []
        }
        this.addPictures = this.addPictures.bind(this);
    }

    // const img = event.target.files[0];
    // if (img.type.startsWith('image')) {
    //   const name = `${this.props.user.user_id}`;
    //   var formData = new FormData();
    //   formData.append('photo', img, name);

    //   fetch('https://onetimejob-server.herokuapp.com/avatar', {
    //     method: 'POST',
    //     body: formData
    //   })
    //   .then(data => console.log(data))
    //   .catch(err => console.log(err))

    addPictures(event) {
        const img = event.target.files[0];
        const name = `${/*user id family */1}${img.originalname}`;
        const data = new FormData();
        data.append('photo', img, name);
        fetch('https://localhost:3003/pictures', {
            method: 'POST',
            body: data
        })
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <br/><br/>
                <div>
                    {
                        (this.state.pictures).map((picture, i) => {
                            return <img src={picture} alt='picture' key={i} />
                        })
                    }
                    
                </div>
                <input type="file" id="myfile" name="myfile" multiple onChange={this.addPictures} accept="image/x-png,image/gif,image/jpeg"/>
            </div>
        )
    }
}