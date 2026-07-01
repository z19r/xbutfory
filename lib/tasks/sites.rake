# frozen_string_literal: true

namespace :sites do
  desc 'Replace all listings with the curated set from xbutfory.json'
  task import: :environment do
    if SiteImporter.source_present?
      count = SiteImporter.call
      puts "Imported #{count} curated sites from #{SiteImporter::SOURCE}."
    else
      warn "#{SiteImporter::SOURCE} not found — nothing to import."
    end
  end
end
