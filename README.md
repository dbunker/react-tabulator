React Tabulator
===============

Customizable table including scroll, column search and sort using [React](https://facebook.github.io/react/), [Redux](http://redux.js.org/), [Immutable.js](https://facebook.github.io/immutable-js/), and [Webpack](https://webpack.github.io/).

Instructions
============

- To run in debug mode use `npm run dev`
- To run linter use `npm run lint`
- To run tests use `npm test`
- To build for production use `npm run build`

This is inspired by [redux todomvc](https://github.com/rackt/redux/tree/master/examples/todomvc/) and [Immutable.js](https://facebook.github.io/immutable-js/).

Example Data Format
===================

Full example data set can be found at [data-nlp.json](/static/data/data-nlp.json).

``` json
{
    "items": [
        {
            "data": {
                "noun": "Organization Name",
                "subreddit": "Subreddit Name",
                "count": 20,
                "connectedAdjectives": [
                    {
                        "adjective": "Adjective",
                        "count": 10
                    }
                ]
            },
            "id": 0
        }
    ],
    "headers": [
        {
            "input": true,
            "display": "Organization",
            "key": "noun",
            "size": "8em"
        },
        {
            "input": true,
            "display": "Subreddit",
            "key": "subreddit",
            "size": "8em"
        },
        {
            "sort": true,
            "display": "Count",
            "key": "count",
            "size": "5em"
        },
        {
            "input": true,
            "display": "Connected Adjectives",
            "key": "connectedAdjectives",
            "size": "13em",
            "details": [
                {
                    "input": true,
                    "display": "Adjective",
                    "key": "adjective",
                    "size": "8em"
                },
                {
                    "display": "Count",
                    "key": "count",
                    "size": "5em"
                }
            ]
        }
    ]
}
```
