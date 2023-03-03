import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { Categories } from 'src/categories/entities/category.entity';

export default class CreateCategories implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const countCategories = await connection
      .createQueryBuilder()
      .select()
      .from(Categories, 'Categories')
      .getCount();

    if (countCategories === 0) {
      const categories = [
        {
          name: 'Electronique',
          description: '',
          parent: null,
          children: [
            { name: 'Smartphones', description: '' },
            { name: 'Ordinateurs portables', description: '' },
            { name: 'Ordinateurs de bureau', description: '' },
            { name: 'Tablettes', description: '' },
            { name: 'Televiseurs', description: '' },
            { name: 'Appareils photo et camescopes', description: '' },
            { name: 'Audio et home-cinéma', description: '' },
            { name: 'Accessoires electroniques', description: '' },
          ],
        },
        {
          name: 'Maison et jardin',
          description: '',
          parent: null,
          children: [
            {
              name: 'Meubles',
              description: '',
            },
            {
              name: 'Decoration',
              description: '',
            },
            {
              name: 'Literie et linge de maison',
              description: '',
            },
            {
              name: 'Appareils menagers',
              description: '',
              children: [
                {
                  name: 'Gros electromenager',
                  description: '',
                },
                {
                  name: 'Petit electromenager',
                  description: '',
                },
              ],
            },
            {
              name: 'Jardin et plein air',
              description: '',
              children: [
                {
                  name: "Mobilier d'exterieur",
                  description: '',
                },
                {
                  name: 'Barbecues et grillades',
                  description: '',
                },
                {
                  name: 'Outils de jardinage',
                  description: '',
                },
              ],
            },
          ],
        },
        {
          name: 'Mode',
          description: '',
          parent: null,
          children: [
            {
              name: 'Vêtements pour femmes',
              description: '',
              children: [
                {
                  name: 'Hauts et t-shirts',
                  description: '',
                },
                {
                  name: 'Robes',
                  description: '',
                },
                {
                  name: 'Pantalons et leggings',
                  description: '',
                },
                {
                  name: 'Jupes',
                  description: '',
                },
                {
                  name: 'Costumes et combinaisons',
                  description: '',
                },
                {
                  name: 'Manteaux et vestes',
                  description: '',
                },
                {
                  name: 'Lingerie et vêtements de nuit',
                  description: '',
                },
              ],
            },
            {
              name: 'Vêtements pour hommes',
              description: '',
              children: [
                {
                  name: 'Chemises',
                  description: '',
                },
                {
                  name: 'T-shirts et polos',
                  description: '',
                },
                {
                  name: 'Pantalons et shorts',
                  description: '',
                },
                {
                  name: 'Costumes et vestes',
                  description: '',
                },
                {
                  name: 'Manteaux et vestes',
                  description: '',
                },
                {
                  name: 'Sous-vêtements et vêtements de nuit',
                  description: '',
                },
              ],
            },
            {
              name: 'Vêtements pour enfants',
              description: '',
              children: [
                {
                  name: 'Filles',
                  description: '',
                },
                {
                  name: 'Garçons',
                  description: '',
                },
                {
                  name: 'Bébés',
                  description: '',
                },
              ],
            },
            {
              name: 'Chaussures et accessoires de mode',
              description: '',
              children: [
                {
                  name: 'Chaussures pour femmes',
                  description: '',
                },
                {
                  name: 'Chaussures pour hommes',
                  description: '',
                },
                {
                  name: 'Chaussures pour enfants',
                  description: '',
                },
                {
                  name: 'Sacs a main et portefeuilles',
                  description: '',
                },
                {
                  name: 'Sacs a dos et sacs de voyage',
                  description: '',
                },
                {
                  name: 'Chapeaux et casquettes',
                  description: '',
                },
                {
                  name: 'Echarpes et foulards',
                  description: '',
                },
                {
                  name: 'Gants et mitaines',
                  description: '',
                },
                {
                  name: 'Ceintures',
                  description: '',
                },
                {
                  name: 'Bijoux',
                  description: '',
                },
                {
                  name: 'Lunettes de soleil',
                  description: '',
                },
                {
                  name: 'Montres',
                  description: '',
                },
              ],
            },
          ],
        },
        {
          name: 'Sports et loisirs',
          description: '',
          parent: null,
          children: [
            {
              name: "Sports d'equipe",
              description: '',
              children: [
                {
                  name: 'Football',
                  description: '',
                },
                {
                  name: 'BasketBall',
                  description: '',
                },
                {
                  name: 'VolleyBall',
                  description: '',
                },
                {
                  name: 'Baseball',
                  description: '',
                },
                {
                  name: 'Hockey sur glace',
                  description: '',
                },
              ],
            },
            {
              name: 'Sports individuels',
              description: '',
              children: [
                {
                  name: 'Course a pied',
                  description: '',
                },
                {
                  name: 'Fitness et musculation',
                  description: '',
                },
                {
                  name: 'Cyclisme',
                  description: '',
                },
                {
                  name: 'Randonnee',
                  description: '',
                },
              ],
            },
            {
              name: 'Vêtements et equipement de sport',
              description: '',
              children: [
                {
                  name: 'Vêtements de sport',
                  description: '',
                },
                {
                  name: 'Chaussures de sport',
                  description: '',
                },
                {
                  name: 'Accessoires de sport',
                  description: '',
                },
              ],
            },
            {
              name: 'Camping et randonnee',
              description: '',
              children: [
                {
                  name: 'Tentes et abris',
                  description: '',
                },
                {
                  name: 'Sacs de couchage',
                  description: '',
                },
                {
                  name: 'Matelas et oreillers',
                  description: '',
                },
                {
                  name: 'Rechauds et ustensiles de cuisine',
                  description: '',
                },
              ],
            },
            {
              name: 'Sports nautiques',
              description: '',
              children: [
                {
                  name: 'Natation',
                  description: '',
                },
                {
                  name: 'Plongee sous-marine',
                  description: '',
                },
                {
                  name: 'Surf et bodyboard',
                  description: '',
                },
                {
                  name: 'Kayak et canoë',
                  description: '',
                },
              ],
            },
          ],
        },
        {
          name: 'Beaute et sante',
          description: '',
          parent: null,
          children: [
            {
              name: 'Soins de la peau et du corps',
              description: '',
              children: [
                {
                  name: 'Soins du visage',
                  description: '',
                },
                {
                  name: 'Soins du corps',
                  description: '',
                },
                {
                  name: 'Soins des cheveux',
                  description: '',
                },
              ],
            },
            {
              name: 'Maquillage',
              description: '',
              children: [
                {
                  name: 'Teint',
                  description: '',
                },
                {
                  name: 'Yeux',
                  description: '',
                },
                {
                  name: 'Levres',
                  description: '',
                },
              ],
            },
            {
              name: 'Parfums et fragrances',
              description: '',
            },
            {
              name: 'Sante et bien-être',
              description: '',
              children: [
                {
                  name: 'Vitamines et complements alimentaires',
                  description: '',
                },
                {
                  name: 'Perte de poids et regime',
                  description: '',
                },
                {
                  name: 'Sexualite et contraception',
                  description: '',
                },
              ],
            },
            {
              name: 'Hygiene personnelle',
              description: '',
              children: [
                {
                  name: 'Soins bucco-dentaires',
                  description: '',
                },
                {
                  name: 'Soins feminins',
                  description: '',
                },
                {
                  name: 'Soins pour hommes',
                  description: '',
                },
                {
                  name: "Accessoires d'hygiene personnelle",
                  description: '',
                },
              ],
            },
          ],
        },
      ];

      for (const category of categories) {
        const newCategory = plainToClass(Categories, {
          name: category.name,
          description: category.description,
        });

        if (category.parent) {
          const parentCategory = await connection
            .getRepository(Categories)
            .findOne({ name: category.parent.name });

          newCategory.parent = parentCategory;
        }

        const savedCategory = await connection
          .getRepository(Categories)
          .save(newCategory);

        if (category.children) {
          for (const subCategory of category.children) {
            const newSubCategory = plainToClass(Categories, {
              name: subCategory.name,
              description: subCategory.description,
              parent: savedCategory,
            });

            await connection.getRepository(Categories).save(newSubCategory);
          }
        }
      }
    }
  }
}
