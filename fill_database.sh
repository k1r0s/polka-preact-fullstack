#!/bin/sh

# This script requires jq

curl -H "Content-Type: application/json" -d '{ "title": "How to cook", "hours": 400, "credits": 200, "difficulty": "hard", "description": "In this course we are going to learn, how to cook" }' "localhost/api/courses" -v
curl -H "Content-Type: application/json" -d '{ "title": "How to play Pokemon", "hours": 300, "difficulty": "mid", "credits": 100, "description": "Are you sure you are into this?" }' "localhost/api/courses" -v
curl -H "Content-Type: application/json" -d '{ "title": "How to talk", "hours": 800, "difficulty": "hard", "credits": 200, "description": "Do you know how to talk in public?" }' "localhost/api/courses" -v

studentsPayload='[{ "name": "José", "email": "jose@student.org" }, { "name": "Raphael", "email": "raph@student.org" }, { "name": "Alice", "email": "alice@student.org" }]'

response=$(curl -s "localhost/api/courses")

for item in $(echo "$response" | jq -r '.[]'); do
  curl -H "Content-Type: application/json" -X PUT -d "$studentsPayload" "localhost/api/students/$item" -v
done

