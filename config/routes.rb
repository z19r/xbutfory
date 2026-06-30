Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  root "pages#home"
  get "feed.xml", to: "feeds#show", as: :feed, format: false
  get "entry/:slug", to: "entries#show", as: :entry
  get "submit", to: "submissions#new", as: :new_submission
  resources :submissions, only: [ :create, :edit, :update ]
  patch "submissions/:id/status", to: "submissions#transition", as: :submission_status
  get "categories", to: "categories#index"
  post "entries/:entry_id/vote", to: "votes#create", as: :entry_vote
  get "sign_in", to: "sessions#new", as: :sign_in
  post "sign_in", to: "sessions#create"
  delete "sign_out", to: "sessions#destroy", as: :sign_out
  get "sign_up", to: "registrations#new", as: :sign_up
  post "sign_up", to: "registrations#create"

  get "password/reset", to: "passwords#new", as: :new_password_reset
  post "password/reset", to: "passwords#create", as: :password_reset
  get "password/reset/:token/edit", to: "passwords#edit", as: :edit_password_reset
  patch "password/reset/:token", to: "passwords#update", as: :update_password_reset

  get "account", to: "accounts#settings", as: :account_settings
  patch "account/profile", to: "accounts#update_profile", as: :account_profile
  patch "account/security", to: "accounts#update_security", as: :account_security
  patch "account/notifications", to: "accounts#update_notifications", as: :account_notifications
  post "account/api_key", to: "accounts#regenerate_api_key", as: :account_api_key
  delete "account", to: "accounts#destroy", as: :account
  get "account/submissions", to: "accounts#submissions", as: :manage_submissions
end
