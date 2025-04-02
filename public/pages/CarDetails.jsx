const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { carService } from "../services/car.service.js"

export function CarDetails() {

    const [car, setCar] = useState(null)
    const params = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        loadCar()
    }, [params.carId])


    function loadCar() {
        carService.get(params.carId)
            .then(setCar)
            .catch(err => {
                console.log('err:', err)
                navigate('/car')
            })
    }

    function onBack() {
        navigate('/car')
        // navigate(-1)
    }

    if (!car) return <div>Loading...</div>

    return <section className="car-details">
        <h1>Car Vendor: {car.vendor}</h1>
        <h2>Car Speed: {car.speed}</h2>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim rem accusantium, itaque ut voluptates quo? Vitae animi maiores nisi, assumenda molestias odit provident quaerat accusamus, reprehenderit impedit, possimus est ad?</p>
        
        <button onClick={onBack} >Back</button>
        <Link to="/car/BV82rS">Next Car</Link>
    </section>
}