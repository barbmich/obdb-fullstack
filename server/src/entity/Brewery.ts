import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
class Address {
  @Field({ nullable: true })
  street: string;

  @Field({ nullable: true })
  city: string;

  @Field({ nullable: true })
  state: string;

  @Field({ nullable: true })
  postalCode: string;

  @Field({ nullable: true })
  country: string;
}

@ObjectType()
class Coordinates {
  @Field({ nullable: true })
  longitude: string;

  @Field({ nullable: true })
  latitude: string;
}

@ObjectType()
class Contacts {
  @Field({ nullable: true })
  phone: string;

  @Field({ nullable: true })
  website: string;
}

@ObjectType()
export class Brewery {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  breweryType: string;

  @Field({ nullable: true })
  address: Address;

  @Field({ nullable: true })
  coordinates: Coordinates;

  @Field({ nullable: true })
  contacts: Contacts;
}
