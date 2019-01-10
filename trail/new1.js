var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'error'
});

client.ping({requestTimeout: 30000,}, function (err) {
    if(err){
        console.error(err);
    }
    else{
        console.log('work well');
    }
});

client.search({
    index: 'logstash-db_log-2019.1.3',
    type: 'doc',
    size: 2,
    body: {
        query:{
            multi_match:{
                "query": "407414",
                "fields": ["db_message", "message"]
            }
        },
        aggs: {
            type: {
                terms: {
                    "field": "type.keyword"
                },
                aggs: {
                    folder: {
                        terms: {
                            "field": "log_folder.keyword"
                        },
                        aggs: {
                            log: {
                                terms: {
                                    "field": "log_name.keyword"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
).then(function (res){
    var hits = res.hits;
    console.log(hits.hits);
}, function (err) {
    console.error(err);
});