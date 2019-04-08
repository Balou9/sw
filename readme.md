# sw

weather client for apixu api

#### Usage

```
git clone https://github.com/Balou9/sw
```

paste your apixu key (weather_client.js, line 6)

#### Cli

```
node weather_client.js [type] [city] [date]
```

type history requires date yyyy-MM-dd

available types:  
current  
forecast  
search  
history

#### Example

```
node weather_client.js current Lagos

node weather_client.js history Lagos 2019-01-01
```
