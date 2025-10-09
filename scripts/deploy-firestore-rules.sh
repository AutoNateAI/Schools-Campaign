#!/bin/bash

# Deploy Firestore Security Rules
# This script updates the Firestore security rules in your Firebase project

echo "🔒 Deploying Firestore Security Rules..."

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null
then
    echo "❌ Firebase CLI is not installed."
    echo "Install it with: npm install -g firebase-tools"
    exit 1
fi

# Deploy rules
firebase deploy --only firestore:rules

echo "✅ Firestore rules deployed successfully!"
