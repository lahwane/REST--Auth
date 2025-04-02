const { Link } = ReactRouterDOM

import { authService } from '../services/auth.service.js'
import { CarPreview } from './CarPreview.jsx'

export function CarList({ cars, onRemoveCar }) {
	const user = authService.getLoggedinUser()
    
    function isAllowed(car) {
        if (!user) return false
        if (user.isAdmin || user._id === car.owner._id) return true

        return false
    }

	return <ul className="car-list">
        {cars.map(car => (
            <li key={car._id}>
                <CarPreview car={car} />
                <section className="actions">
                    <button>
                        <Link to={`/car/${car._id}`}>Details</Link>
                    </button>
                    {isAllowed(car) && <div>
                        <button onClick={() => onRemoveCar(car._id)}>Remove Car</button>
                        <button>
                            <Link to={`/car/edit/${car._id}`}>Edit</Link>
                        </button>
                    </div>}
                </section>
            </li>
        ))}
    </ul>
}
