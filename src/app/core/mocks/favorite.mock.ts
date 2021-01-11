export const FavoriteMock = [
    {
        id: '1',
        title: 'Title 1',
        description: 'Description 1',
        url: 'https://www.my-favorite-name-1.com',
        slug: 'slug-1',
        category: {
            id: '1',
            title: 'category 1',
            description: 'category description 1',
            type: 'type-1',
            slug: 'slug-1',
            image: 'cat-1.jpg',
            lastModifiedDate: new Date()
        },
        category_id: '1',
        image: 'image1.jpg',
        lastModifiedDate: new Date(),
        important: true,
        visits: 10
    },
    {
        id: '2',
        title: 'Title 2',
        description: 'Description 2',
        url: 'https://www.my-favorite-name-2.com',
        slug: 'slug-2',
        category: {
            id: '2',
            title: 'category 2',
            description: 'category description 2',
            type: 'type-2',
            slug: 'slug-2',
            image: 'cat-2.jpg',
            lastModifiedDate: new Date()
        },
        category_id: '2',
        image: 'image2.jpg',
        lastModifiedDate: new Date(),
        important: false,
        visits: 15
    }
];