# telepub
A pub sub js library which teleport html attributes from one element to another

Inspired by StimulusJS, Livedata concepts of android and microfrontends, the purpose of this project is to provide a simple 'tell dont ask' pardigm for passing messages between html components that live on the same page

This project is in currently in early development stage.
Sample usage (will not work currently)
html:
```
  <div data-pub="topic: 'namespace-model-id' value: 'x'" >
  </div>
  <div data-sub="namespace.model.id">
  </div>
```

js:
```
const telepub = new Telepub(document.body)

telepub.start()
```

now the html element with data sub is
```
<div data-sub="namespace-model-id" data-namespace-model-id='x'>
  </div>
  
// we teleported the attribute between two html elements!  
```
