import React from 'react';
import { UncontrolledCarousel } from 'reactstrap'

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div>
           <div> 
            <UncontrolledCarousel 
            items={[
              {
                // altText: 'Slide 1',
                // caption: 'Slide 1',
                key: 1,
                src: 'https://ecs7.tokopedia.net/blog-tokopedia-com/uploads/2017/08/Banner-Blog-Seller-Center-1200x630.jpg'
              },
              {
                // altText: 'Slide 2',
                // caption: 'Slide 2',
                key: 2,
                src: 'https://ecs7.tokopedia.net/blog-tokopedia-com/uploads/2020/05/New-Promo-flow_Header.jpg'
              },
              {
                // altText: 'Slide 3',
                // caption: 'Slide 3',
                key: 3,
                src: 'https://pbs.twimg.com/media/EGQ_rhuUwAAp3S0.jpg'
              }
            ]} />
            </div>
           
            <div className="container pt-5"> 
                <div className="row featurette m-auto">
                <div className="col-md-7 m-auto ">
                    <h2 className="featurette-heading">LINNEBÄCK C</h2>
                    <h2 className="featurette-heading">IKEA | Kursi</h2>
                    <p className="lead" style={{ textAlign: "justify"}}>Lebar:\t55 cm Kedalaman:\t69,5 cm Tinggi:\t72,4 cm Lebar dudukan:\t57 cm Kedalaman dudukan:\t50 cm Tinggi dudukan:\t42,4 cm Berat total:\t6,50 kg</p>
                </div>
                <div className="col-md-5 d-flex justify-content-center">
                <img className="shadow p-3 mb-5 bg-white rounded justify-content-center" width="400"
                        height="400" 
                src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/334/0933452_PE791908_S4.jpg"   alt="Responsive image"/>
                </div>
            </div>
            <div className="row featurette">
                <div className="col-md-7 order-md-2 m-auto pl-auto">
                    <h2 className="featurette-heading">IDALINNEA E </h2>
                    <h2 className="featurette-heading">IKEA | Perabotan</h2>
                    <p className="lead" style={{ textAlign: "justify"}}>Ritsleting yang tersembunyi membuat sarung mudah dilepas.  Sarung bantal dengan tampilan cermin karena memiliki pola yang sama di kedua sisi.  Katun adalah bahan alami lembut dan mudah dirawat yang dapat Anda cuci dengan mesin.</p>
                </div>
                <div className="col-md-5 order-md-1">
                <img className="shadow p-3 mb-5 bg-white rounded" width="400"
                        height="400" 
                src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/107/0810719_PE771386_S4.jpg" alt="Responsive image"/>
                </div>
            </div>
            <div className="row featurette">
                <div className="col-md-7 m-auto">
                    <h2 className="featurette-heading">VARDAGEN B</h2>
                    <h2 className="featurette-heading">IKEA | Panci dengan penutup</h2>
                    <p className="lead" style={{ textAlign: "justify"}} >Anda dapat menggunakan panci ini dengan tutup di kompor dan oven, dan membawanya ke meja dan menyajikan makanan dari itu.</p>
                </div>
                <div className="col-md-5 d-flex justify-content-center">
                <img className="shadow bg-white rounded bd-placeholder-img bd-placeholder-img-lg featurette-image mx-auto" width="400"
                        height="400" 
                src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/938/0893878_PE718922_S4.jpg"  alt="Responsive image"/>
                </div>
            </div>
            </div>
            </div>
        
         );
    }
}
 
export default HomePage;