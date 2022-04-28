---
sidebar_position: 1
---

# General

### Virtual Environment
#### New Project Setup
```python
virtualenv venv
```
#### Activate Virtual Environment

```python
.\venv\bin\activate
```
### List Comprehension
Suffix of for is the filter part: `for... if condition`  
Prefix is the map:  `item.prop for...`
```python
mapped_and_filtered = [ item.prop for item in items if item.prop == filter_val]
```