const { useState, useEffect, useRef } = React
const { Link } = ReactRouterDOM

import { carService } from "../services/car.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { utilService } from "../services/util.service.js"

import { CarFilter } from "../cmps/CarFilter.jsx"
import { CarList } from "../cmps/CarList.jsx"
import { authService } from "../services/auth.service.js"

export function CarIndex() {

    const loggedinUser = authService.getLoggedinUser()

    const [cars, setCars] = useState(null)
    const [filterBy, setFilterBy] = useState(carService.getDefaultFilter())
    const debouncedSetFilter = useRef(utilService.debounce(onSetFilterBy, 500))

    useEffect(() => {
        carService.query(filterBy)
            .then(cars => setCars(cars))
            .catch(err => console.log('err:', err))
    }, [filterBy])

    function onRemoveCar(carId) {
        carService.remove(carId)
            .then(() => {
                setCars(prevCars => prevCars.filter(car => car._id !== carId))
                showSuccessMsg(`Car Removed! ${carId}`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Problem Removing ' + carId)
            })
    }

    function onSetFilterBy(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    if (!cars) return <div>Loading...</div>

    return <section className="car-index">
        <CarFilter filterBy={filterBy} onSetFilterBy={debouncedSetFilter.current} />
        {loggedinUser && <Link to="/car/edit" >Add Car</Link>}
        <CarList cars={cars} onRemoveCar={onRemoveCar} />
    </section>
}