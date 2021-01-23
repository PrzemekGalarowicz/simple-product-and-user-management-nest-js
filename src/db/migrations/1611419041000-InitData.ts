import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { commerce, name, internet, date, address } from 'faker'
import { Roles } from '../../shared/enums/roles.enum'
import { Tag } from '../../products/db/tag.entity'
import { Product } from '../../products/db/products.entity'
import { User } from '../../users/db/users.entity'
import { UserAddress } from '../../users/db/user-address.entity'

export class InitData1611419041000 implements MigrationInterface {
    name = 'InitData1611419041000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const tags = await this.saveTags()
        const userAddresses = await this.saveUserAddresses()
        await this.saveProducts(tags)
        await this.saveUsers(userAddresses)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

    private randomNumberBetween(first: number, last: number): number {
        return Math.floor(Math.random() * last) + first;
    }

    private randomUserAddresses(userAddresses: UserAddress[]): UserAddress[] {
        const length = this.randomNumberBetween(0, 160)
        const userAddressesArr = []

        for (let i = 0; i < length; i++) {
            userAddressesArr.push(userAddresses[i])
        }

        return userAddressesArr
    }

    private randomTags(tags: Tag[]): Tag[] {
        const length = this.randomNumberBetween(0, 4)
        const tagsArr = []

        for (let i = 0; i < length; i++) {
            tagsArr.push(tags[i].name)
        } 

        return tagsArr
    }

    private randomRoles(): Roles {
        const roles = {
            CUSTOMER: 'CUSTOMER',
            SELLER: 'SELLER',
            ADMIN: 'ADMIN'
        }
        return Object.keys(roles)[this.randomNumberBetween(0, 2)]
    }

    private async saveTags(): Promise<Tag[]> {
        const tagsArr: Tag[] = [];
        const tags = [
            { name: 'NEW' },
            { name: 'PROMO' },
            { name: 'LAST_ITEMS' }
        ];

        for (const tag of tags) {
            const tagToSave = new Tag();

            tagToSave.name = tag.name;

            tagsArr.push(await getRepository('Tag').save(tagToSave));
        }

        console.log('Tags saved');

        return tagsArr;
    }

    private async saveProducts(tagsArr: Tag[]): Promise<Product[]> {
        const productsArr: Product[] = []

        for (let i = 0; i < 101; i++) {
            const newProduct = new Product()

            newProduct.name = commerce.productName()
            newProduct.description = commerce.productDescription()
            newProduct.price = commerce.price()
            newProduct.count = this.randomNumberBetween(1, 10)
            newProduct.tags = this.randomTags(tagsArr)

            productsArr.push(await getRepository('Product').save(newProduct));

            console.log(`${i} products generated.`);
        }

        console.log('Products saved.');

        return productsArr;
    }

    private async saveUsers(userAddresses: UserAddress[]): Promise<User[]> {
        const usersArr: User[] = []

        for (let i = 0; i < 101; i++) {
            const newUser = new User()

            newUser.firstName = name.firstName()
            newUser.lastName = name.lastName()
            newUser.email = internet.email()
            newUser.birthday = date.past()
            newUser.address = this.randomUserAddresses(userAddresses)
            newUser.role = this.randomRoles()

            usersArr.push(await getRepository('User').save(newUser));

            console.log(`${i} users generated.`);
        }

        console.log('Users saved.');

        return usersArr;
    }

    private async saveUserAddresses(): Promise<UserAddress[]> {
        const userAddressesArr: UserAddress[] = []

        for (let i = 0; i < 161; i++) {
            const newUserAddresses = new UserAddress()

            newUserAddresses.country = address.country()
            newUserAddresses.city = address.city()
            newUserAddresses.street = address.streetName()
            newUserAddresses.number = this.randomNumberBetween(1, 20)

            userAddressesArr.push(await getRepository('UserAddress').save(newUserAddresses));

            console.log(`${i} user addresses generated.`);
        }

        console.log('User addresses saved.');

        return userAddressesArr;
    }

}
