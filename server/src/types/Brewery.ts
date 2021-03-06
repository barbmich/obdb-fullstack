import { Field, Float, ID, Int, ObjectType } from "type-graphql";

@ObjectType()
export class Address {
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
export class Coordinates {
  @Field({ nullable: true })
  longitude: string;

  @Field({ nullable: true })
  latitude: string;
}

@ObjectType()
export class Contacts {
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
  slug: string;

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

  @Field(() => Int)
  likes: number;

  @Field(() => Float, { nullable: true })
  stars: number | undefined;
}
