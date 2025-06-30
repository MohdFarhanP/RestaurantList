export class RestaurantEntity {
    public constructor(
        public readonly name: string,
        public readonly contact: string, 
        public readonly address: string,
        public readonly email: string, 
        public readonly id: string = crypto.randomUUID()){ }
}
