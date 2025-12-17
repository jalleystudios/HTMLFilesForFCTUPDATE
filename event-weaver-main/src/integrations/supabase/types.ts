export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      big_event_content: {
        Row: {
          ai_description: string | null
          created_at: string
          custom_description: string | null
          event_id: string | null
          event_uuid: string | null
          fun_facts: Json | null
          headline: string | null
          id: string
          is_edited: boolean
          last_ai_updated: string | null
          promotional_hooks: Json | null
          subheadline: string | null
          updated_at: string
        }
        Insert: {
          ai_description?: string | null
          created_at?: string
          custom_description?: string | null
          event_id?: string | null
          event_uuid?: string | null
          fun_facts?: Json | null
          headline?: string | null
          id?: string
          is_edited?: boolean
          last_ai_updated?: string | null
          promotional_hooks?: Json | null
          subheadline?: string | null
          updated_at?: string
        }
        Update: {
          ai_description?: string | null
          created_at?: string
          custom_description?: string | null
          event_id?: string | null
          event_uuid?: string | null
          fun_facts?: Json | null
          headline?: string | null
          id?: string
          is_edited?: boolean
          last_ai_updated?: string | null
          promotional_hooks?: Json | null
          subheadline?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "big_event_content_event_uuid_fkey"
            columns: ["event_uuid"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["event_uuid"]
          },
          {
            foreignKeyName: "big_event_content_event_uuid_fkey"
            columns: ["event_uuid"]
            isOneToOne: false
            referencedRelation: "v_events_min"
            referencedColumns: ["event_uuid"]
          },
        ]
      }
      chat_messages: {
        Row: {
          client_id: string | null
          content: string
          created_at: string
          id: string
          metadata: Json
          role: string
          session_id: string
          tsv: unknown
          user_id: string
        }
        Insert: {
          client_id?: string | null
          content: string
          created_at?: string
          id?: string
          metadata?: Json
          role: string
          session_id: string
          tsv?: unknown
          user_id: string
        }
        Update: {
          client_id?: string | null
          content?: string
          created_at?: string
          id?: string
          metadata?: Json
          role?: string
          session_id?: string
          tsv?: unknown
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_sessions: {
        Row: {
          created_at: string
          id: string
          last_active_at: string
          metadata: Json
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_active_at?: string
          metadata?: Json
          title?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          last_active_at?: string
          metadata?: Json
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      cities: {
        Row: {
          airport_codes: string[] | null
          city_aliases: string[] | null
          city_id: string
          city_name: string
          city_slug: string
          country: string | null
          country_code: string | null
          created_at: string | null
          default_radius_miles: number | null
          full_city_name: string | null
          lat: number | null
          lng: number | null
          metro_market: string | null
          primary_airport: string | null
          region: string | null
          searchable: boolean | null
          state: string | null
          state_code: string | null
          timezone: string | null
          updated_at: string | null
        }
        Insert: {
          airport_codes?: string[] | null
          city_aliases?: string[] | null
          city_id?: string
          city_name: string
          city_slug: string
          country?: string | null
          country_code?: string | null
          created_at?: string | null
          default_radius_miles?: number | null
          full_city_name?: string | null
          lat?: number | null
          lng?: number | null
          metro_market?: string | null
          primary_airport?: string | null
          region?: string | null
          searchable?: boolean | null
          state?: string | null
          state_code?: string | null
          timezone?: string | null
          updated_at?: string | null
        }
        Update: {
          airport_codes?: string[] | null
          city_aliases?: string[] | null
          city_id?: string
          city_name?: string
          city_slug?: string
          country?: string | null
          country_code?: string | null
          created_at?: string | null
          default_radius_miles?: number | null
          full_city_name?: string | null
          lat?: number | null
          lng?: number | null
          metro_market?: string | null
          primary_airport?: string | null
          region?: string | null
          searchable?: boolean | null
          state?: string | null
          state_code?: string | null
          timezone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      email_templates: {
        Row: {
          add_on_type: string | null
          category: string
          config: Json
          created_at: string
          description: string | null
          html_template: string
          id: string
          is_favorite: boolean
          is_system: boolean
          last_used_at: string | null
          layout_type: string | null
          name: string
          output_formats: Json | null
          parent_event_id: string | null
          quick_share_template: string | null
          style_tags: string[] | null
          theme_mode: string | null
          thumbnail_url: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          add_on_type?: string | null
          category?: string
          config?: Json
          created_at?: string
          description?: string | null
          html_template: string
          id?: string
          is_favorite?: boolean
          is_system?: boolean
          last_used_at?: string | null
          layout_type?: string | null
          name: string
          output_formats?: Json | null
          parent_event_id?: string | null
          quick_share_template?: string | null
          style_tags?: string[] | null
          theme_mode?: string | null
          thumbnail_url?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          add_on_type?: string | null
          category?: string
          config?: Json
          created_at?: string
          description?: string | null
          html_template?: string
          id?: string
          is_favorite?: boolean
          is_system?: boolean
          last_used_at?: string | null
          layout_type?: string | null
          name?: string
          output_formats?: Json | null
          parent_event_id?: string | null
          quick_share_template?: string | null
          style_tags?: string[] | null
          theme_mode?: string | null
          thumbnail_url?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      event_category_overrides: {
        Row: {
          category: string
          created_at: string | null
          event_id: string | null
          id: number
          normalized_title: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          event_id?: string | null
          id?: number
          normalized_title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          event_id?: string | null
          id?: number
          normalized_title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      event_code_sequences: {
        Row: {
          date: string
          last_seq: number
        }
        Insert: {
          date: string
          last_seq: number
        }
        Update: {
          date?: string
          last_seq?: number
        }
        Relationships: []
      }
      events: {
        Row: {
          city: string | null
          created_at: string | null
          event_code: string | null
          event_date: string | null
          event_datetime_local: string | null
          event_datetime_utc: string | null
          event_id: string
          event_name: string | null
          event_time: string | null
          event_uuid: string | null
          is_active: boolean | null
          is_concert: boolean | null
          is_parking: boolean | null
          is_playoff: boolean | null
          is_selected: boolean | null
          is_sports: boolean | null
          is_theater: boolean | null
          last_price_update_at: string | null
          last_scraped_at: string | null
          league: string | null
          market_city: string | null
          name: string | null
          performer_primary: string | null
          performer_secondary: string | null
          price_avg: number | null
          price_currency: string | null
          price_max: number | null
          price_min: number | null
          source: string | null
          sport: string | null
          state: string | null
          team_away: string | null
          team_home: string | null
          tm_classification: string | null
          tm_event_id: string | null
          tm_image: string | null
          tm_seatmap: string | null
          tz: string | null
          updated_at: string | null
          url: string | null
          venue: string | null
          venue_address: string | null
          venue_lat: number | null
          venue_lng: number | null
        }
        Insert: {
          city?: string | null
          created_at?: string | null
          event_code?: string | null
          event_date?: string | null
          event_datetime_local?: string | null
          event_datetime_utc?: string | null
          event_id: string
          event_name?: string | null
          event_time?: string | null
          event_uuid?: string | null
          is_active?: boolean | null
          is_concert?: boolean | null
          is_parking?: boolean | null
          is_playoff?: boolean | null
          is_selected?: boolean | null
          is_sports?: boolean | null
          is_theater?: boolean | null
          last_price_update_at?: string | null
          last_scraped_at?: string | null
          league?: string | null
          market_city?: string | null
          name?: string | null
          performer_primary?: string | null
          performer_secondary?: string | null
          price_avg?: number | null
          price_currency?: string | null
          price_max?: number | null
          price_min?: number | null
          source?: string | null
          sport?: string | null
          state?: string | null
          team_away?: string | null
          team_home?: string | null
          tm_classification?: string | null
          tm_event_id?: string | null
          tm_image?: string | null
          tm_seatmap?: string | null
          tz?: string | null
          updated_at?: string | null
          url?: string | null
          venue?: string | null
          venue_address?: string | null
          venue_lat?: number | null
          venue_lng?: number | null
        }
        Update: {
          city?: string | null
          created_at?: string | null
          event_code?: string | null
          event_date?: string | null
          event_datetime_local?: string | null
          event_datetime_utc?: string | null
          event_id?: string
          event_name?: string | null
          event_time?: string | null
          event_uuid?: string | null
          is_active?: boolean | null
          is_concert?: boolean | null
          is_parking?: boolean | null
          is_playoff?: boolean | null
          is_selected?: boolean | null
          is_sports?: boolean | null
          is_theater?: boolean | null
          last_price_update_at?: string | null
          last_scraped_at?: string | null
          league?: string | null
          market_city?: string | null
          name?: string | null
          performer_primary?: string | null
          performer_secondary?: string | null
          price_avg?: number | null
          price_currency?: string | null
          price_max?: number | null
          price_min?: number | null
          source?: string | null
          sport?: string | null
          state?: string | null
          team_away?: string | null
          team_home?: string | null
          tm_classification?: string | null
          tm_event_id?: string | null
          tm_image?: string | null
          tm_seatmap?: string | null
          tz?: string | null
          updated_at?: string | null
          url?: string | null
          venue?: string | null
          venue_address?: string | null
          venue_lat?: number | null
          venue_lng?: number | null
        }
        Relationships: []
      }
      events_media_links: {
        Row: {
          created_at: string
          event_uuid: string
          image_url_cdn: string | null
          seatmap_url_cdn: string | null
          tm_event_id: string | null
          tn_event_id: string | null
          tn_url: string | null
          tn_url_last_checked_at: string | null
          tn_url_params: Json | null
          tn_url_status: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          event_uuid: string
          image_url_cdn?: string | null
          seatmap_url_cdn?: string | null
          tm_event_id?: string | null
          tn_event_id?: string | null
          tn_url?: string | null
          tn_url_last_checked_at?: string | null
          tn_url_params?: Json | null
          tn_url_status?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          event_uuid?: string
          image_url_cdn?: string | null
          seatmap_url_cdn?: string | null
          tm_event_id?: string | null
          tn_event_id?: string | null
          tn_url?: string | null
          tn_url_last_checked_at?: string | null
          tn_url_params?: Json | null
          tn_url_status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_media_links_event_uuid_fkey"
            columns: ["event_uuid"]
            isOneToOne: true
            referencedRelation: "events"
            referencedColumns: ["event_uuid"]
          },
          {
            foreignKeyName: "events_media_links_event_uuid_fkey"
            columns: ["event_uuid"]
            isOneToOne: true
            referencedRelation: "v_events_min"
            referencedColumns: ["event_uuid"]
          },
        ]
      }
      external_event_refs: {
        Row: {
          created_at: string
          event_uuid: string | null
          id: number
          metadata: Json
          parent_event_uuid: string | null
          provider: string
          provider_event_id: string
          ref_confidence: number | null
          ref_kind: string
          ref_status: string
          request_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          event_uuid?: string | null
          id?: number
          metadata?: Json
          parent_event_uuid?: string | null
          provider: string
          provider_event_id: string
          ref_confidence?: number | null
          ref_kind: string
          ref_status?: string
          request_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          event_uuid?: string | null
          id?: number
          metadata?: Json
          parent_event_uuid?: string | null
          provider?: string
          provider_event_id?: string
          ref_confidence?: number | null
          ref_kind?: string
          ref_status?: string
          request_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "external_event_refs_event_uuid_fkey"
            columns: ["event_uuid"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["event_uuid"]
          },
          {
            foreignKeyName: "external_event_refs_event_uuid_fkey"
            columns: ["event_uuid"]
            isOneToOne: false
            referencedRelation: "v_events_min"
            referencedColumns: ["event_uuid"]
          },
          {
            foreignKeyName: "external_event_refs_parent_event_uuid_fkey"
            columns: ["parent_event_uuid"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["event_uuid"]
          },
          {
            foreignKeyName: "external_event_refs_parent_event_uuid_fkey"
            columns: ["parent_event_uuid"]
            isOneToOne: false
            referencedRelation: "v_events_min"
            referencedColumns: ["event_uuid"]
          },
        ]
      }
      major_sports_cities: {
        Row: {
          active: boolean | null
          country: string | null
          id: number
          lat: number | null
          lng: number | null
          name: string
          order_index: number | null
          slug: string
          state: string | null
        }
        Insert: {
          active?: boolean | null
          country?: string | null
          id: number
          lat?: number | null
          lng?: number | null
          name: string
          order_index?: number | null
          slug: string
          state?: string | null
        }
        Update: {
          active?: boolean | null
          country?: string | null
          id?: number
          lat?: number | null
          lng?: number | null
          name?: string
          order_index?: number | null
          slug?: string
          state?: string | null
        }
        Relationships: []
      }
      ncaa_teams: {
        Row: {
          active: boolean | null
          city: string | null
          city_id: string | null
          color_primary_hex: string | null
          color_secondary_hex: string | null
          conference: string | null
          created_at: string | null
          full_team_name: string | null
          mascot: string | null
          ncaa_team_id: string
          school_name: string
          sport: string
          state: string | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          city?: string | null
          city_id?: string | null
          color_primary_hex?: string | null
          color_secondary_hex?: string | null
          conference?: string | null
          created_at?: string | null
          full_team_name?: string | null
          mascot?: string | null
          ncaa_team_id?: string
          school_name: string
          sport: string
          state?: string | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          city?: string | null
          city_id?: string | null
          color_primary_hex?: string | null
          color_secondary_hex?: string | null
          conference?: string | null
          created_at?: string | null
          full_team_name?: string | null
          mascot?: string | null
          ncaa_team_id?: string
          school_name?: string
          sport?: string
          state?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ncaa_teams_city_fk"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["city_id"]
          },
        ]
      }
      pro_teams: {
        Row: {
          active: boolean | null
          city: string | null
          city_id: string | null
          color_primary_hex: string | null
          color_secondary_hex: string | null
          created_at: string | null
          full_name: string | null
          league: string
          mascot: string | null
          rgb_primary: string | null
          rgb_secondary: string | null
          sport: string
          state: string | null
          team_id: string
          team_name: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          city?: string | null
          city_id?: string | null
          color_primary_hex?: string | null
          color_secondary_hex?: string | null
          created_at?: string | null
          full_name?: string | null
          league: string
          mascot?: string | null
          rgb_primary?: string | null
          rgb_secondary?: string | null
          sport: string
          state?: string | null
          team_id?: string
          team_name: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          city?: string | null
          city_id?: string | null
          color_primary_hex?: string | null
          color_secondary_hex?: string | null
          created_at?: string | null
          full_name?: string | null
          league?: string
          mascot?: string | null
          rgb_primary?: string | null
          rgb_secondary?: string | null
          sport?: string
          state?: string | null
          team_id?: string
          team_name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pro_teams_city_fk"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["city_id"]
          },
        ]
      }
      purchased_inventory_raw: {
        Row: {
          category: string | null
          cc_last_digits: string | null
          co_operative: string | null
          consignment: string | null
          created_by: string | null
          credit_card_group: string | null
          dedupe_hash: string | null
          duplicate_of_id: number | null
          event_date: string | null
          event_name: string | null
          event_type: string | null
          external_reference: string | null
          group_cost: string | null
          id: number
          import_batch_id: string
          import_filename: string | null
          imported_at: string
          in_hand_date: string | null
          internal_notes: string | null
          inventory_tags: string | null
          is_duplicate: boolean
          likely_duplicate: boolean
          likely_duplicate_reason: string | null
          line_key: string | null
          payment_method: string | null
          payment_status: string | null
          performer: string | null
          po_tags: string | null
          purchase_date: string | null
          purchase_id: string | null
          purchase_key: string | null
          qty: string | null
          received: string | null
          row: string | null
          seats: string | null
          section: string | null
          state: string | null
          status: string | null
          stock_type: string | null
          unit_cost: string | null
          vendor: string | null
          vendor_source: string | null
          venue: string | null
          zone_seating: string | null
        }
        Insert: {
          category?: string | null
          cc_last_digits?: string | null
          co_operative?: string | null
          consignment?: string | null
          created_by?: string | null
          credit_card_group?: string | null
          dedupe_hash?: string | null
          duplicate_of_id?: number | null
          event_date?: string | null
          event_name?: string | null
          event_type?: string | null
          external_reference?: string | null
          group_cost?: string | null
          id?: number
          import_batch_id?: string
          import_filename?: string | null
          imported_at?: string
          in_hand_date?: string | null
          internal_notes?: string | null
          inventory_tags?: string | null
          is_duplicate?: boolean
          likely_duplicate?: boolean
          likely_duplicate_reason?: string | null
          line_key?: string | null
          payment_method?: string | null
          payment_status?: string | null
          performer?: string | null
          po_tags?: string | null
          purchase_date?: string | null
          purchase_id?: string | null
          purchase_key?: string | null
          qty?: string | null
          received?: string | null
          row?: string | null
          seats?: string | null
          section?: string | null
          state?: string | null
          status?: string | null
          stock_type?: string | null
          unit_cost?: string | null
          vendor?: string | null
          vendor_source?: string | null
          venue?: string | null
          zone_seating?: string | null
        }
        Update: {
          category?: string | null
          cc_last_digits?: string | null
          co_operative?: string | null
          consignment?: string | null
          created_by?: string | null
          credit_card_group?: string | null
          dedupe_hash?: string | null
          duplicate_of_id?: number | null
          event_date?: string | null
          event_name?: string | null
          event_type?: string | null
          external_reference?: string | null
          group_cost?: string | null
          id?: number
          import_batch_id?: string
          import_filename?: string | null
          imported_at?: string
          in_hand_date?: string | null
          internal_notes?: string | null
          inventory_tags?: string | null
          is_duplicate?: boolean
          likely_duplicate?: boolean
          likely_duplicate_reason?: string | null
          line_key?: string | null
          payment_method?: string | null
          payment_status?: string | null
          performer?: string | null
          po_tags?: string | null
          purchase_date?: string | null
          purchase_id?: string | null
          purchase_key?: string | null
          qty?: string | null
          received?: string | null
          row?: string | null
          seats?: string | null
          section?: string | null
          state?: string | null
          status?: string | null
          stock_type?: string | null
          unit_cost?: string | null
          vendor?: string | null
          vendor_source?: string | null
          venue?: string | null
          zone_seating?: string | null
        }
        Relationships: []
      }
      selected_events: {
        Row: {
          action: string
          action_timestamp: string | null
          created_at: string | null
          event_category: string | null
          event_code: string | null
          event_date: string
          event_id: string
          event_time: string
          event_title: string
          event_uuid: string | null
          id: string
          image_url: string | null
          updated_at: string | null
          user_id: string
          venue: string | null
        }
        Insert: {
          action: string
          action_timestamp?: string | null
          created_at?: string | null
          event_category?: string | null
          event_code?: string | null
          event_date: string
          event_id: string
          event_time: string
          event_title: string
          event_uuid?: string | null
          id?: string
          image_url?: string | null
          updated_at?: string | null
          user_id: string
          venue?: string | null
        }
        Update: {
          action?: string
          action_timestamp?: string | null
          created_at?: string | null
          event_category?: string | null
          event_code?: string | null
          event_date?: string
          event_id?: string
          event_time?: string
          event_title?: string
          event_uuid?: string | null
          id?: string
          image_url?: string | null
          updated_at?: string | null
          user_id?: string
          venue?: string | null
        }
        Relationships: []
      }
      sold_inventory_csv_stage: {
        Row: {
          "% Profit Margin": string | null
          Category: string | null
          "Created By": string | null
          Customer: string | null
          "Electronic Transfer": string | null
          "Event Date": string | null
          "Event ID": string | null
          "Event Name": string | null
          "Event Tags": string | null
          "Event Type": string | null
          "External Ref.": string | null
          "Fulfillment Status": string | null
          import_filename: string | null
          imported_at: string | null
          "In-Hand Date": string | null
          "Internal Notes": string | null
          "Inventory Tags": string | null
          "Invoice Date": string | null
          "Invoice ID": string | null
          "Invoice Tags": string | null
          "Payment Status": string | null
          "PDFs/Barcodes/ID Attached": string | null
          Performer: string | null
          Profit: string | null
          "Purchase ID": string | null
          QTY: string | null
          Received: string | null
          Row: string | null
          Seats: string | null
          Section: string | null
          State: string | null
          "Stock Type": string | null
          Total: string | null
          "Total Cost": string | null
          "Unit Cost": string | null
          "Unit Ticket Sales": string | null
          Vendor: string | null
          Venue: string | null
          "Zone Seating": string | null
        }
        Insert: {
          "% Profit Margin"?: string | null
          Category?: string | null
          "Created By"?: string | null
          Customer?: string | null
          "Electronic Transfer"?: string | null
          "Event Date"?: string | null
          "Event ID"?: string | null
          "Event Name"?: string | null
          "Event Tags"?: string | null
          "Event Type"?: string | null
          "External Ref."?: string | null
          "Fulfillment Status"?: string | null
          import_filename?: string | null
          imported_at?: string | null
          "In-Hand Date"?: string | null
          "Internal Notes"?: string | null
          "Inventory Tags"?: string | null
          "Invoice Date"?: string | null
          "Invoice ID"?: string | null
          "Invoice Tags"?: string | null
          "Payment Status"?: string | null
          "PDFs/Barcodes/ID Attached"?: string | null
          Performer?: string | null
          Profit?: string | null
          "Purchase ID"?: string | null
          QTY?: string | null
          Received?: string | null
          Row?: string | null
          Seats?: string | null
          Section?: string | null
          State?: string | null
          "Stock Type"?: string | null
          Total?: string | null
          "Total Cost"?: string | null
          "Unit Cost"?: string | null
          "Unit Ticket Sales"?: string | null
          Vendor?: string | null
          Venue?: string | null
          "Zone Seating"?: string | null
        }
        Update: {
          "% Profit Margin"?: string | null
          Category?: string | null
          "Created By"?: string | null
          Customer?: string | null
          "Electronic Transfer"?: string | null
          "Event Date"?: string | null
          "Event ID"?: string | null
          "Event Name"?: string | null
          "Event Tags"?: string | null
          "Event Type"?: string | null
          "External Ref."?: string | null
          "Fulfillment Status"?: string | null
          import_filename?: string | null
          imported_at?: string | null
          "In-Hand Date"?: string | null
          "Internal Notes"?: string | null
          "Inventory Tags"?: string | null
          "Invoice Date"?: string | null
          "Invoice ID"?: string | null
          "Invoice Tags"?: string | null
          "Payment Status"?: string | null
          "PDFs/Barcodes/ID Attached"?: string | null
          Performer?: string | null
          Profit?: string | null
          "Purchase ID"?: string | null
          QTY?: string | null
          Received?: string | null
          Row?: string | null
          Seats?: string | null
          Section?: string | null
          State?: string | null
          "Stock Type"?: string | null
          Total?: string | null
          "Total Cost"?: string | null
          "Unit Cost"?: string | null
          "Unit Ticket Sales"?: string | null
          Vendor?: string | null
          Venue?: string | null
          "Zone Seating"?: string | null
        }
        Relationships: []
      }
      sold_inventory_raw: {
        Row: {
          category: string | null
          created_by: string | null
          customer: string | null
          dedupe_hash: string | null
          duplicate_of_id: number | null
          electronic_transfer: string | null
          event_date: string | null
          event_id: string | null
          event_name: string | null
          event_tags: string | null
          event_type: string | null
          expected_value_amount: number | null
          external_ref: string | null
          fulfillment_status: string | null
          id: number
          import_batch_id: string
          import_filename: string | null
          imported_at: string
          in_hand_date: string | null
          internal_notes: string | null
          inventory_tags: string | null
          invoice_date: string | null
          invoice_id: string | null
          invoice_key: string | null
          invoice_tags: string | null
          is_duplicate: boolean
          likely_duplicate: boolean
          likely_duplicate_reason: string | null
          line_key: string | null
          payment_status: string | null
          pdfs_barcodes_id_attached: string | null
          percent_profit_margin: string | null
          performer: string | null
          profit: string | null
          profit_amount: number | null
          profit_margin: number | null
          profit_margin_raw: number | null
          purchase_id: string | null
          qty: string | null
          received: string | null
          row: string | null
          seats: string | null
          section: string | null
          state: string | null
          stock_type: string | null
          ticket_cost_amount: number | null
          ticket_sales_amount: number | null
          total: string | null
          total_cost: string | null
          unit_cost: string | null
          unit_cost_amount: number | null
          unit_ticket_sales: string | null
          vendor: string | null
          vendor_source: string | null
          venue: string | null
          zone_seating: string | null
        }
        Insert: {
          category?: string | null
          created_by?: string | null
          customer?: string | null
          dedupe_hash?: string | null
          duplicate_of_id?: number | null
          electronic_transfer?: string | null
          event_date?: string | null
          event_id?: string | null
          event_name?: string | null
          event_tags?: string | null
          event_type?: string | null
          expected_value_amount?: number | null
          external_ref?: string | null
          fulfillment_status?: string | null
          id?: number
          import_batch_id?: string
          import_filename?: string | null
          imported_at?: string
          in_hand_date?: string | null
          internal_notes?: string | null
          inventory_tags?: string | null
          invoice_date?: string | null
          invoice_id?: string | null
          invoice_key?: string | null
          invoice_tags?: string | null
          is_duplicate?: boolean
          likely_duplicate?: boolean
          likely_duplicate_reason?: string | null
          line_key?: string | null
          payment_status?: string | null
          pdfs_barcodes_id_attached?: string | null
          percent_profit_margin?: string | null
          performer?: string | null
          profit?: string | null
          profit_amount?: number | null
          profit_margin?: number | null
          profit_margin_raw?: number | null
          purchase_id?: string | null
          qty?: string | null
          received?: string | null
          row?: string | null
          seats?: string | null
          section?: string | null
          state?: string | null
          stock_type?: string | null
          ticket_cost_amount?: number | null
          ticket_sales_amount?: number | null
          total?: string | null
          total_cost?: string | null
          unit_cost?: string | null
          unit_cost_amount?: number | null
          unit_ticket_sales?: string | null
          vendor?: string | null
          vendor_source?: string | null
          venue?: string | null
          zone_seating?: string | null
        }
        Update: {
          category?: string | null
          created_by?: string | null
          customer?: string | null
          dedupe_hash?: string | null
          duplicate_of_id?: number | null
          electronic_transfer?: string | null
          event_date?: string | null
          event_id?: string | null
          event_name?: string | null
          event_tags?: string | null
          event_type?: string | null
          expected_value_amount?: number | null
          external_ref?: string | null
          fulfillment_status?: string | null
          id?: number
          import_batch_id?: string
          import_filename?: string | null
          imported_at?: string
          in_hand_date?: string | null
          internal_notes?: string | null
          inventory_tags?: string | null
          invoice_date?: string | null
          invoice_id?: string | null
          invoice_key?: string | null
          invoice_tags?: string | null
          is_duplicate?: boolean
          likely_duplicate?: boolean
          likely_duplicate_reason?: string | null
          line_key?: string | null
          payment_status?: string | null
          pdfs_barcodes_id_attached?: string | null
          percent_profit_margin?: string | null
          performer?: string | null
          profit?: string | null
          profit_amount?: number | null
          profit_margin?: number | null
          profit_margin_raw?: number | null
          purchase_id?: string | null
          qty?: string | null
          received?: string | null
          row?: string | null
          seats?: string | null
          section?: string | null
          state?: string | null
          stock_type?: string | null
          ticket_cost_amount?: number | null
          ticket_sales_amount?: number | null
          total?: string | null
          total_cost?: string | null
          unit_cost?: string | null
          unit_cost_amount?: number | null
          unit_ticket_sales?: string | null
          vendor?: string | null
          vendor_source?: string | null
          venue?: string | null
          zone_seating?: string | null
        }
        Relationships: []
      }
      sports_teams: {
        Row: {
          aliases: string | null
          city: string | null
          country: string | null
          created_at: string | null
          league: string
          logo_url: string | null
          primary_color: string | null
          secondary_color: string | null
          sport: string
          state: string | null
          team_id: string
          team_name: string
          updated_at: string | null
        }
        Insert: {
          aliases?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          league: string
          logo_url?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          sport: string
          state?: string | null
          team_id?: string
          team_name: string
          updated_at?: string | null
        }
        Update: {
          aliases?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          league?: string
          logo_url?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          sport?: string
          state?: string | null
          team_id?: string
          team_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      team_aliases: {
        Row: {
          alias: string
          alias_id: string
          created_at: string | null
          team_id: string
        }
        Insert: {
          alias: string
          alias_id?: string
          created_at?: string | null
          team_id: string
        }
        Update: {
          alias?: string
          alias_id?: string
          created_at?: string | null
          team_id?: string
        }
        Relationships: []
      }
      template_presets: {
        Row: {
          config: Json
          created_at: string
          description: string | null
          id: string
          is_default: boolean
          is_favorite: boolean
          name: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          config?: Json
          created_at?: string
          description?: string | null
          id?: string
          is_default?: boolean
          is_favorite?: boolean
          name: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          config?: Json
          created_at?: string
          description?: string | null
          id?: string
          is_default?: boolean
          is_favorite?: boolean
          name?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      template_usage: {
        Row: {
          event_id: string | null
          id: string
          output_format: string | null
          template_id: string | null
          used_at: string | null
          user_id: string | null
        }
        Insert: {
          event_id?: string | null
          id?: string
          output_format?: string | null
          template_id?: string | null
          used_at?: string | null
          user_id?: string | null
        }
        Update: {
          event_id?: string | null
          id?: string
          output_format?: string | null
          template_id?: string | null
          used_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "template_usage_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "email_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      ticketmaster_events_archive: {
        Row: {
          archived_at: string | null
          cached_at: string | null
          category: string | null
          created_at: string | null
          date: string
          event_code: string | null
          event_id: string
          event_uuid: string | null
          id: string
          image_url: string | null
          source: string | null
          time: string
          title: string
          venue: string
        }
        Insert: {
          archived_at?: string | null
          cached_at?: string | null
          category?: string | null
          created_at?: string | null
          date: string
          event_code?: string | null
          event_id: string
          event_uuid?: string | null
          id?: string
          image_url?: string | null
          source?: string | null
          time: string
          title: string
          venue: string
        }
        Update: {
          archived_at?: string | null
          cached_at?: string | null
          category?: string | null
          created_at?: string | null
          date?: string
          event_code?: string | null
          event_id?: string
          event_uuid?: string | null
          id?: string
          image_url?: string | null
          source?: string | null
          time?: string
          title?: string
          venue?: string
        }
        Relationships: []
      }
      ticketmaster_events_cache: {
        Row: {
          currency: string | null
          event_id: string
          genre: string | null
          image_height: number | null
          image_ratio: string | null
          image_url: string | null
          image_width: number | null
          last_fetched_at: string | null
          name: string | null
          price_max: number | null
          price_min: number | null
          segment: string | null
          source: string | null
          start_date: string | null
          start_datetime: string | null
          start_time: string | null
          status: string | null
          subgenre: string | null
          timezone: string | null
          updated_from_raw_id: number | null
          venue_city: string | null
          venue_country: string | null
          venue_country_code: string | null
          venue_id: string | null
          venue_latitude: number | null
          venue_longitude: number | null
          venue_name: string | null
          venue_postal_code: string | null
          venue_state: string | null
          venue_state_code: string | null
        }
        Insert: {
          currency?: string | null
          event_id: string
          genre?: string | null
          image_height?: number | null
          image_ratio?: string | null
          image_url?: string | null
          image_width?: number | null
          last_fetched_at?: string | null
          name?: string | null
          price_max?: number | null
          price_min?: number | null
          segment?: string | null
          source?: string | null
          start_date?: string | null
          start_datetime?: string | null
          start_time?: string | null
          status?: string | null
          subgenre?: string | null
          timezone?: string | null
          updated_from_raw_id?: number | null
          venue_city?: string | null
          venue_country?: string | null
          venue_country_code?: string | null
          venue_id?: string | null
          venue_latitude?: number | null
          venue_longitude?: number | null
          venue_name?: string | null
          venue_postal_code?: string | null
          venue_state?: string | null
          venue_state_code?: string | null
        }
        Update: {
          currency?: string | null
          event_id?: string
          genre?: string | null
          image_height?: number | null
          image_ratio?: string | null
          image_url?: string | null
          image_width?: number | null
          last_fetched_at?: string | null
          name?: string | null
          price_max?: number | null
          price_min?: number | null
          segment?: string | null
          source?: string | null
          start_date?: string | null
          start_datetime?: string | null
          start_time?: string | null
          status?: string | null
          subgenre?: string | null
          timezone?: string | null
          updated_from_raw_id?: number | null
          venue_city?: string | null
          venue_country?: string | null
          venue_country_code?: string | null
          venue_id?: string | null
          venue_latitude?: number | null
          venue_longitude?: number | null
          venue_name?: string | null
          venue_postal_code?: string | null
          venue_state?: string | null
          venue_state_code?: string | null
        }
        Relationships: []
      }
      ticketmaster_events_raw: {
        Row: {
          event_id: string | null
          fetched_at: string | null
          id: number
          payload: Json
          source: string | null
        }
        Insert: {
          event_id?: string | null
          fetched_at?: string | null
          id?: number
          payload: Json
          source?: string | null
        }
        Update: {
          event_id?: string | null
          fetched_at?: string | null
          id?: number
          payload?: Json
          source?: string | null
        }
        Relationships: []
      }
      tm_test_events: {
        Row: {
          city: string | null
          created_at: string | null
          id: string
          raw: Json | null
          size: number | null
          state_code: string | null
        }
        Insert: {
          city?: string | null
          created_at?: string | null
          id?: string
          raw?: Json | null
          size?: number | null
          state_code?: string | null
        }
        Update: {
          city?: string | null
          created_at?: string | null
          id?: string
          raw?: Json | null
          size?: number | null
          state_code?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      v_chat_messages: {
        Row: {
          client_id: string | null
          content: string | null
          created_at: string | null
          id: string | null
          metadata: Json | null
          role: string | null
          session_id: string | null
          session_owner: string | null
          tsv: unknown
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      v_events_min: {
        Row: {
          canonical_url: string | null
          city: string | null
          event_code: string | null
          event_id: string | null
          event_uuid: string | null
          image_url_cdn: string | null
          seatmap_url_cdn: string | null
          state: string | null
          time_utc: string | null
          title: string | null
          tm_event_id: string | null
          tn_event_id: string | null
          tn_url: string | null
          tn_url_last_checked_at: string | null
          tn_url_status: string | null
          venue: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      _sold_row_hash: {
        Args: {
          "% Profit Margin": string
          Category: string
          "Created By": string
          Customer: string
          "Electronic Transfer": string
          "Event Date": string
          "Event ID": string
          "Event Name": string
          "Event Tags": string
          "Event Type": string
          "External Ref.": string
          "Fulfillment Status": string
          import_filename: string
          "In-Hand Date": string
          "Internal Notes": string
          "Inventory Tags": string
          "Invoice Date": string
          "Invoice ID": string
          "Invoice Tags": string
          "Payment Status": string
          "PDFs/Barcodes/ID Attached": string
          Performer: string
          Profit: string
          "Purchase ID": string
          QTY: string
          Received: string
          Row: string
          Seats: string
          Section: string
          State: string
          "Stock Type": string
          Total: string
          "Total Cost": string
          "Unit Cost": string
          "Unit Ticket Sales": string
          Vendor: string
          Venue: string
          "Zone Seating": string
        }
        Returns: string
      }
      generate_event_code:
        | { Args: never; Returns: string }
        | { Args: { event_date: string }; Returns: string }
      get_event_columns: {
        Args: never
        Returns: {
          column_name: string
        }[]
      }
      process_sold_inventory_csv: { Args: never; Returns: number }
      refresh_ticketmaster_cache: { Args: never; Returns: undefined }
      search_chat_messages: {
        Args: { q: string; session?: string }
        Returns: {
          client_id: string | null
          content: string
          created_at: string
          id: string
          metadata: Json
          role: string
          session_id: string
          tsv: unknown
          user_id: string
        }[]
        SetofOptions: {
          from: "*"
          to: "chat_messages"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
