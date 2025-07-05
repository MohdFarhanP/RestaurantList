export class RestaurantEntity {
    public constructor(
        public readonly name: string,
        public readonly contact: string,
        public readonly email: string,  
        public readonly street: string,
        public readonly landmark: string,
        public readonly area: string,
        public readonly city: string,
        public readonly state: string,
        public readonly pincode: string,
        public readonly country: string,
        public readonly id: number = 123){ }
}
